var express = require('express');
var router = express.Router();
var {dbUrl} = require('../dbConfig');
const mongoose = require('mongoose');
const {userDetails} = require('../schema');
const {hashing,hashCompare,createJWT, authVerify} = require('./auth')

mongoose.connect(dbUrl);

/* Register account */
router.post('/register', async(req, res)=> {
  try {
    const email = await userDetails.findOne({email:req.body.email})

    if(email)
    {
      res.send({
        statusCode:200,
        message:"user exists",
        data:req.body.email
      })

    }

    else{

      let hashedPassword = await hashing(req.body.password)
      req.body.password = hashedPassword;

      await userDetails.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password  
      })

      res.send({
        statusCode:200,
        message:"user created",
        data:req.body.email
      })

    }

  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"internal server error",
      error:error
    })
  }
});

/*Login*/
router.post('/login',async(req,res)=>{
  try {
    const email = await userDetails.findOne({email:req.body.email})
    
    if(!email)
    {
      res.send({
        statusCode:200,
        message:"no user found",
        data:req.body.email
      })

    }

    else{
      let compare = await hashCompare (req.body.password,email.password)

      if (compare==true){

        const token = await createJWT({email:req.body.email})

        res.send({
          statusCode:200,
          token,
          message:"logged in",
          data:req.body.email
        })
      }
      else{
        res.send({
          statusCode:200,
          message:"incorrect",
          data:req.body.email
        })
      }    

    }
    
  } catch (error) {
    console.log(error)
    res.send({
      statusCode:500,
      message:"internal server error",
      error:error
    })
  }
})

router.get('/verify-token/:token',async(req,res)=>{
  const validity = await authVerify(req.params.token)
  if(validity){
    res.send({
      statusCode:200,
      message:"valid session"
    })
  }
  else{
    res.send({
      statusCode:401,
      message:"session timed-out"
    })
  }
})

/* Create Booking */
// router.put('/booking/:id', (req, res)=>{
//     userDetails.findById(req.params.id,function(err, result) {
//       if (!err) {
//         if (!result){
//           res.sendStatus(404).send('User was not found').end();
//         }
//         else{
//           result.posts.push(req.body);
//           result.markModified('posts'); 
//           result.save(function(saveerr, saveresult) {
//             if (!saveerr) {
//               res.status(200).send(saveresult);
//             } else {
//               res.status(400).send(saveerr.message);
//             }
//           });
//         }
//       } else {
//         res.status(400).send(err.message);
//       }
//     });
//   });

module.exports = router;

