const mongoose=require("mongoose");
const schema=mongoose.Schema;

const aduserShema=new schema({
    username:{type:String,required:true,minlength:3},
    email:{type:String,required:true,unique:true},
    phonenumber:{type:Number,required:true,minlength:10},
    address:{type:String,required:true,minlength:3},
    course: { type: String, required: true, enum: ['MCA', 'MBA', 'M Tech', 'B Tech', 'BE Civil', 'Robotics', 'AI'] }
},{
    timestamps:true
});
const adUsers=mongoose.model('Admission_users',aduserShema);
 module.exports=adUsers;
