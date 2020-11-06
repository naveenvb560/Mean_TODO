const express = require('express');
const router =  express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config  = require('../config/database');


router.post( '/register' ,(req,res,next) => {
    let newUser =  new User ({
        Username : req.body.username,
        Password: req.body.password,
        
    });
        User.addUser(newUser , (err , user) => {
            if(err){
                res.json({success: false, msg:'failed'});
                }else{
                    res.json({success :true , msg:'success'});
                }
           
        });
});
router.post('/EditTodo' ,  passport.authenticate('jwt', { session: false }),(req,res,next) => {
  id=req.user.id;
  let Todo_id = req.body.Id;
  let E_Todo = req.body.Todo;
   User.EdiTodo(id, Todo_id, E_Todo ,(err , user) => {
    if(err){
        res.json({success: false, msg:'failed'});
        }else{
            res.json({success: true, msg:'Success'});
        }
      
      }) 
  
   
    });
router.post('/RemoveTodo' ,  passport.authenticate('jwt', { session: false }),(req,res,next) => {
  id=req.user.id;
  let Todo_id = req.body.Todo_id;
   User.RemTodo(id, Todo_id ,(err , user) => {
    if(err){
        res.json({success: false, msg:'failed'});
        }else{
            res.json({success: true, msg:'Success'});
        }
      
      }) 
  
   
    });
router.get('/getTodo' , passport.authenticate('jwt', { session: false }),(req,res,next) => {
id=req.user.id;
 User.getTodo(id,(err , user) => {
  if(err){
      res.json({success: false, msg:'failed'});
      }else{
          res.json(user);
      }
    
    }) 

 
  });
router.post( '/AddTodo' , passport.authenticate('jwt', { session: false }),(req,res,next) => {
   
    todo =  [{ todo:  req.body.todo }];
   // uSer = req.user.Username;
   id =  req.user._id;
      User.addTodo(todo , id ,(err , user) => {
          if(err){
              res.json({success: false, msg:'failed'});
              }else{
                  res.json({success :true , msg:'success'});
              }
            
            })
            });
         

    router.post('/authenticate', (req, res, next) => {
        const username = req.body.username;
        const password = req.body.password;
      
        User.getUserByUsername(username, (err, user) => {
          if (err) throw err;
          if (!user) {
            return res.json({ success: false, msg: 'User not found' });
          }
      
          User.comparePassword(password, user.Password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const token = jwt.sign({ data: user }, config.secret, {
                expiresIn: 604800 // 1 week
              });
      
              res.json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                  id: user._id,
                  username: user.username,
                
                }
              });
            } else {
              return res.json({ success: false, msg: 'Wrong password' });
            }
          });
        });
      });

      router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        res.json({
          user: {
            _id: req.user._id,
          
            username: req.user.Username,
           
          }
        });
      });

module.exports =router;