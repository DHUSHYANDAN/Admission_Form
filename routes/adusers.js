const express=require('express');
const router=express.Router();
const adUsers=require('../model/aduser');

router.route('/').get((req,res)=>{
    adUsers.find({},({}))
    .then(adusers=>res.json(adusers))
    .catch(err => res.status(400).json("Error:", err))

})

router.route('/admission').post(async (req, res) => {
    const { username, email, address, phonenumber,course } = req.body;
    try {
        const existingUser = await adUsers.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
                const newUser = new adUsers({
                    username,
                    email,
                    address,
                    phonenumber,
                    course
                });
                await newUser.save();
                res.json({ message: 'User admission successfully submited' });
    } catch (error) {
        console.error('Error admission user:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});
module.exports=router;