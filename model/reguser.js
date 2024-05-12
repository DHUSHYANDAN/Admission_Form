const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const reguserShema = new schema({
    username: { type: String, required: [true, 'Please enter an username'], minlength: 3 },

    email: { type: String, required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [isEmail, "please enter a valid email"] },

    phonenumber: {
        type: String, required: [true, 'Please enter an phonenumber'], minlength: [10, 'Minimum phonenumber length is 10 numbers'],

        validate: [isMobilePhone, "Please enter a valid phone number"]
    },

    password: { type: String, required: [true, 'Please enter a password'], minlength: [6, 'Minimum password length is 6 characters'] }

}, {
    timestamps: true
});

// fire a function before doc saved to db  // pre refers to before
reguserShema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  


const regUsers = mongoose.model('Reg_users', reguserShema);
module.exports = regUsers;
