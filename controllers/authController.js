const regUser = require('../model/reguser');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', username: '', phonenumber: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('Reg_users validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
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

module.exports.register_post = async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    try {
        const reguser = await regUser.create({ username, email, password, phonenumber });
        res.status(201).json(reguser);
    }
    catch (err) {

        const errors = handleErrors(err);
        res.status(400).json(errors);

    }
}

module.exports.login_post = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('new login');
}