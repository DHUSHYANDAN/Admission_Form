const mongoose=require("mongoose");
const schema=mongoose.Schema;

const reguserShema=new schema({
    username:{type:String,required:true,minlength:3},
    email:{type:String,required:true,unique:true},
    phonenumber:{type:Number,required:true,minlength:10},
    password:{type:String,required:true,minlength:3}
},{
    timestamps:true
});
const regUsers=mongoose.model('Reg_users',reguserShema);
 module.exports=regUsers;
