const express = require('express');
const router = express.Router();
const regUsers = require('../model/reguser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();





const authenticationToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split('')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    });
};

router.route('/posts').get(authenticationToken, (req, res) => {
    console.log(req.user);
    res.json({});
})


router.route('/').get((req, res) => {
    regUsers.find({}, ({}))
        .then(regusers => res.json(regusers))
        .catch(err => res.status(400).json("Error:", err))

})

router.route('/register').post(async (req, res) => {
    const { username, email, password, phonenumber } = req.body;
    try {
        const existingUser = await regUsers.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hashedPassword) => {
                const password = hashedPassword;
                const newUser = new regUsers({
                    username,
                    email,
                    password,
                    phonenumber
                });
                await newUser.save();
                res.status(201).json({ message: 'User registered successfully' });
            });
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});


router.route('/login').post(async (req, res) => {
    try {
        const user = await regUsers.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send('user not found please register');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send("password is incorrect !!")
        }
        //  res.send('Login successfull')
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN);
        res.status(202).json({ accessToken: accessToken });
    }
    catch (error) {

    }

})


module.exports = router;