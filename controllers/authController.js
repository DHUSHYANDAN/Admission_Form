const regUser=require('../model/reguser');

  // controller actions
module.exports.register_get=(req,res)=>{
    res.render('register');
}

module.exports.login_get=(req,res)=>{
    res.render('login');
}

module.exports.register_post = async (req,res)=>{
    const { username, email, password, phonenumber } = req.body;
    try{
const reguser=await regUser.create({username, email, password, phonenumber }); 
res.status(201).json(reguser);
    }
    catch(err){
      

        res.status(400).json('Error:user registeration not successfull');

    }
}

module.exports.login_post=(req,res)=>{ 
    const{email,password}=req.body;
    console.log(email,password);
    res.send('new login');
}