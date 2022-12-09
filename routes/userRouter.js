const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    googleCallback,
    appleCallback,
    localSignup
    
} = require('../controller/userController');

//구글 로그인
router.get('/google', passport.authenticate('google', {scope:['profile', 'email'],}))

router.get('/google/callback', googleCallback);

//에플 로그인
router.get('/apple/callback', appleCallback );

router.post('/apple/callback', passport.authenticate('apple') );


//로컬 회원가입 & 로그인
router.post('/signup', localSignup);

module.exports = router;
