require('dotenv').config();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('../model/user');


//구글 로그인

const googleCallback = (req, res, next) =>{
    try {
        passport.authenticate(
            'google',
            {failureRedirect: '/'},
            (err, user, info) =>{
                if(err) return next(err);

                const {userId, name, email} = user;
                const token = jwt.sign({userId}, process.env.MY_KEY, {
                    expiresIn: '24h',
                });

                result = {
                    userId,
                    token,
                    name,
                    email
                };

                res.send({user : result});
            }
        ) (req, res, next);
    } catch (error) {
        res.status(400).send({errorMessage: '구글 로그인 실패'});
        
    }
};

// 에플로그인

const appleCallback = (req, res, next) =>{
    try {
        passport.authenticate(
            "apple",

            { failureRedirect: "/" },
            (err, user, info) =>{
                console.log("콜백 함수입니다.")
                if (err) return next(err);
                const idToken = jwt.decode(profile);
                console.log(idToken,"이건가요")
                const {userId, email, name} = user;

                const token = jwt.sign({userId}, process.env.MY_KEY, {
                    expiresIn:"24h",
                });
                console.log(token, '토큰을 보여줘!')
                result = {
                    userId,
                    email,
                    name,
                    token
                };
                res.send({user:result});
            }
        )(req, res, next);
    } catch (error) {
        res.status(400).send({errorMessage:"애플 로그인 실패"});
    }
}

//로컬 회원가입 & 로그인

const localSignup = async (req, res, next) =>{
    // try {
        const {email, password, repeat_password} = req.body;
        console.log(req.body,'나오니')

        if(password !== repeat_password) {
            res.status(400).send({
                errorMessage: "패스워드가 일치하지 않습니다."
            });
            return;
        }
        const existUsers = user.find({
            $or:[{email}]
        });
        console.log(email,'중복가입 확인하기');
        if (existUsers.length) {
            res.status(400).send({
                errorMessage:'중복된 이메일이 존재합니다.'
            });
            return;
        }
        const newUser = new user({email, password});
        newUser.save();
        // console.log(newUser);
        res.status(201).send({
            message : '회원가입에 성공했습니다!'
        });
    // } catch (error) {
    //     res.status(400).send({
    //         errorMessage:'회원가입 실패'
    //     })
    // }
}


module.exports = {
    googleCallback,
    appleCallback,
    localSignup
};