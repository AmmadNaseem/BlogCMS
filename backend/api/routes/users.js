var express = require('express');
var userModel=require('../models/user')
var router = express.Router();
const bcrypt=require('bcrypt');


// =================FUNCTION FOR CHECKING THE EMAIL ALREADY EXIST OR NOT AS A MIDDLEWARE
// function checkEmail(req,res,next){
//   var email=req.body.Email;
//   var checkexitemail=userModel.findOne({email:email});
//   checkexitemail.exec((err,data)=>{
//  if(err) throw err;
//  if(data){
//   return res.status(200).json({
//     msg:"Email Already Exits",
//     results:data
// });
//  }
//  next();
//   });
// }



/* GET users listing. */
router.get('/', function(req, res, next) {
  try {
    
  var userDetails=new userModel({
    name:'awais',
    email:'awais@gmail.com',
    password:'12345'
  })

  userDetails.save((err,request)=>{
       if(err) throw err;
      });
      return res.render('index', { title: 'User data inserted' });
    
  } catch (error) {
    return res.send(error.message)
  }

});

// ---FOR REGISTRATION OF USER
router.post('/register', function(req, res, next) {
 
    bcrypt.hash(req.body.Password, 10, function(err, hash) {
  
      if(err){
        res.status(400).json({
              msg:"Something Wrong, Try Later!",
              results:err
          });
      }else{
          var userDetails = new userModel({
            name: req.body.Name,
            email: req.body.Email,
            password: hash,
            role:'Author'
            
          });

          userDetails.save().then(response=>{
            res.status(201).json({
                msg:"User created Successfully",
                results:response
            });

          }).catch(err=>{
            res.json(err);
            });

      }        
    });

});


// =============FOR LOGIN==========
router.post("/login",function(req,res,next){
 
  var email=req.body.Email;

  userModel.find({email:email})
  .exec()
  .then(user=>{
      if(user.length<1){
          res.status(200).json({
            msg:"Auth Failed",
            UserData:'',
            status:'error'
          });
      }else{
          bcrypt.compare(req.body.Password, user[0].password, function(err, result) {
             if(err){
              res.json({
                msg:"Auth Failed",
                UserData:'',
                status:'error'
              });
             }
             if(result){
              res.status(200).json({
                msg:"User Login Successfully",
                  UserData:user,
                  status:'success'
              });
             }else{
              res.json({
                msg:"Auth Failed",
                UserData:'',
                status:'error'
              });
             }
          });
      
  }
  })
  .catch(err=>{
      res.json({
          error:err
      });
  })
 
 
  });
 

module.exports = router;
