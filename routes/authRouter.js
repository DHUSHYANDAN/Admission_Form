const express = require('express');
const router = express.Router();
const authController=require('../controllers/authController');

router.get('/register',authController.register_get);

router.post('/register',authController.register_post);

router.get('/login',authController.login_get);

router.post('/login',authController.login_post);

router.get('/logout',authController.logout_get);

router.post('/admission',authController.admission_post);

router.delete('/admission/verification', authController.verification_delete);



module.exports=router;
