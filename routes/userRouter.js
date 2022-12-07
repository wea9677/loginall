const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    googleCallback,
    appleCallback
} = require('../controller/userController');

//구글 로그인
router.get('/google', passport.authenticate('google', {scope:['profile'],}))

router.get('/auth/google', googleCallback);

//에플 로그인
router.get('/apple', appleCallback );

router.post('/auth/apple', passport.authenticate('apple') );


//로그인


module.exports = router;
