const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require('validator');

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
// fire a function after doc saved to db
reguserShema.post('save', function (doc, next) {
    console.log("new user was created & saved", doc);
    next();

});
// fire a function before doc saved to db  // pre refers to before
// reguserShema.pre('save', function (next) {
//     console.log('user about to be created & saved', this);// this refers to the regUser create in register post authcontroller 
//     next();
// });

const regUsers = mongoose.model('Reg_users', reguserShema);
module.exports = regUsers;
