const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');
const schema=mongoose.Schema;

const aduserSchema=new schema({
    username: { type: String, required: [true, 'Please enter an username'], minlength: 3 },

    email: { type: String, required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [isEmail, "please enter a valid email"] },

    phonenumber: {
        type: String, required: [true, 'Please enter an phonenumber'], minlength: [10, 'Minimum phonenumber length is 10 numbers'],
        maxlength: [10, 'Maximum phone number length is 10 numbers'],
        validate: [isMobilePhone, "Please enter a valid phone number"]
    },
    address:{type:String,required:true,minlength:[1,'please enter the address']},
    course: { type: String, required: true, enum: ['MCA', 'MBA', 'M Tech', 'B Tech', 'BE Civil', 'Robotics', 'AI'] }
},{
    timestamps:true
});


//static method to delete user
aduserSchema.statics.deleteByFields = async function (email, username, phonenumber, address, course) {
    const aduser = await this.findOneAndDelete({ email, username, phonenumber, address, course });
    return aduser;
};
const adUsers=mongoose.model('Admission_users',aduserSchema);
 module.exports=adUsers;
