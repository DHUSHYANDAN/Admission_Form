const express=require('express');
const router=express.Router();
const regUsers=require('../model/reguser')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


router.route('/').get((req,res)=>{
    regUsers.find({},({}))
    .then(regusers=>res.json(regusers))
    .catch(err => res.status(400).json("Error:", err))

})

router.route('/register').post((req,res)=> {
    const username=req.body.username;
    const email=req.body.email; 
    // const password=req.body.password;
    const phonenumber=req.body.phonenumber;

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(req.body.password,salt,(err,hashedPassword)=>{
        const password=hashedPassword;
        const reguser=new regUsers(({username,email,password,phonenumber}));
        
    reguser.save()
    .then(()=>res.json("user added").console.log("registered successsfully"))
    .catch(err=> res.status(400).json("Error:", err))
})
    })
    
})

router.route('/login').post(async(req,res)=>{
    try{
        const user=await regUsers.findOne({email:req.body.email});
   
        if(!user){
            return res.status(400).send('user not found please register');
        }
        const validPassword= await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.send("password is incorrect !!")
        }
        //  res.send('Login successfull')
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN);
        res.json({ accessToken: accessToken });
    }
    catch(error){

    }

})
 










module.exports=router;