const express = require('express');
const passport = require('passport');
const router = express.Router();
const bodyParser = require('body-parser');
const {
    googleCallback,
    // appleCallback,
    localSignup,
    apple_auth,
    apple_refresh,
    tokenG
} = require('../controller/userController');

//구글 로그인
router.get('/google', passport.authenticate('google', {scope:['profile', 'email'],}))

router.get('/google/callback', googleCallback);

//애플 로그인
// router.get('/apple', appleCallback );

// router.post('/apple/callback', passport.authenticate('apple') );

// 애플 로그인 apple-auth
router.post('/oauth/apple', bodyParser(), apple_auth );

router.get('/oauth/apple', tokenG);

router.get('/oauth/apple/refresh', apple_refresh );


//로컬 회원가입 & 로그인
router.post('/signup', localSignup);

module.exports = router;
