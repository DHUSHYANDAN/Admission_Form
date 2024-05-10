const express=require('express');
const router=express.Router();
const regUsers=require('../model/reguser')
const bcrypt = require('bcrypt');


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
        var user=await regUsers.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send('user not found please register');
        }
        var validPassword= await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.send("password is incorrect !!")
        }
        res.send('Login successfull')
    }
    catch(error){

    }

})
 










module.exports=router;