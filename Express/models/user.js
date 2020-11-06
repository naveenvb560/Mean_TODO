const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const config =  require('../config/database');

const UserSchema =  mongoose.Schema({
    Username :{
        type :String,
        required : true
    },
    Password : {
        type:String,
        requried: true
    },
    Todo_List : [{
        todo :String,
        required: false
    }]
},{collection: 'Demo'})
const User =  module.exports = mongoose.model('User', UserSchema);
module.exports.getUserById = function(id,callback){
    User.findById(id, callback);

}
module.exports.getUserByUsername = function(username,callback){
    User.findOne({Username : username},callback);
   
}
module.exports.getTodo = function(id , callback){
   User.findOne({_id:id},'Todo_List',callback);
   
}
module.exports.EdiTodo = function(id,Tod_id , E_Todo){
    var newValues ={ $set: { "Todo_List.$.todo" : E_Todo }};
    User.updateOne( {_id : id , "Todo_List._id" : Tod_id} ,newValues,function(err, res) {
        if (err) throw err;
        
      }); 
    
}
module.exports.RemTodo = function(id,Todo_id){
    var newValues ={ $pull: { Todo_List:{_id : Todo_id } }};
    User.updateOne({ _id : id },newValues,function(err, res) {
        if (err) throw err;
        
      }); 
    
}
module.exports.addUser = function(newUser , callback){
bcrypt.genSalt(10, (err,salt) => {
    bcrypt.hash(newUser.Password , salt , (err, hash )=>{
        if(err) throw err;
    newUser.Password = hash;
    newUser.save(callback);
    });
});
}
module.exports.addTodo = function(newTodo , id,callback){
    
    var newValues ={ $push:{Todo_List: newTodo}};
    User.updateOne({_id: id } ,newValues , function(err, res) {
       if (err) throw err;
       
     });
    }
module.exports.comparePassword = function(candidatePassword, hash,callback){
    bcrypt.compare(candidatePassword, hash,(err, isMatch) => {
        
        if(err) throw err;
        callback(null, isMatch);
    });
}