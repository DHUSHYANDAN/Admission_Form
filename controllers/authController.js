const regUser = require('../model/reguser');
const adUser = require('../model/aduser');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// handle errors for backend
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', username: '', phonenumber: '', address: '', course: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'Email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Entered password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('Reg_users validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// controller actions
module.exports.register_get = (req, res) => {
    res.render('register');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

// JWT token for admission verification
const maxAge2 = 30;
const createToken2 = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN2, {
        expiresIn: maxAge2
    });
}

module.exports.admission_post = async (req, res) => {
    const { username, email, phonenumber, address, course } = req.body;

    try {
        const hunterApiKey = "bfd746001b26869f3839d939ea134f345d8c5c3b";
        const hunterApiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`;
        const emailVerificationResponse = await axios.get(hunterApiUrl);

        if (emailVerificationResponse.data.data.result !== "deliverable") {
            return res.status(400).json({ errors: { email: 'It is not a valid Email' } });
        }

        const aduser = await adUser.create({ username, email, phonenumber, address, course });
        const token2 = createToken2(aduser._id);

        // Use a different cookie for the admission token
        res.cookie('admission_token', token2, { httpOnly: true, maxAge: maxAge2 * 1000 });
        res.status(201).json({ aduser: aduser._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

// Route to handle user deletion
module.exports.verification_delete = async (req, res) => {
    const { email, username, phonenumber, address, course } = req.body;
    try {
        const deletedAdUser = await adUser.deleteByFields(email, username, phonenumber, address, course);
        if (!deletedAdUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(deletedAdUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// JWT token for regular user registration
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
        expiresIn: maxAge
    });
}

module.exports.register_post = async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    try {
        const hunterApiKey = "bfd746001b26869f3839d939ea134f345d8c5c3b";
        const hunterApiUrl = `https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${hunterApiKey}`;
        const emailVerificationResponse = await axios.get(hunterApiUrl);

        if (emailVerificationResponse.data.data.result !== "deliverable") {
            return res.status(400).json({ errors: { email: 'It is not a valid Email' } });
        }

        const reguser = await regUser.create({ username, email, password, phonenumber });
        const token = createToken(reguser._id);

        // Use a different cookie for the registration token
        res.cookie('register_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ reguser: reguser._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await regUser.login(email, password);
        const token = createToken(user._id);

        // Use the same `register_token` for login
        res.cookie('register_token', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    // Clear both tokens
    res.cookie('register_token', '', { maxAge: 1 });
    res.cookie('admission_token', '', { maxAge: 1 });
    res.redirect('/');
}
