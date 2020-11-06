const express =  require('express');
const path =  require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors');

const app=express();
const users = require('./routes/users');
const config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('connected');
});
mongoose.connection.on('error', (err) => {
    console.log('error' + err);
});
app.use(cors());

app.use(bodyParser.json());

//passport
app.use(passport.initialize());
app.use(passport.session());

 require('./config/passport')(passport);
app.use('/',users);
app.listen(3000, () => {
    console.log("Server started");
}
)