require('dotenv').config();
const fs = require('fs');
const config = fs.readFileSync('./config/config.json');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const user = require('../model/user');
const AppleAuth = require('apple-auth');



//구글 로그인

const googleCallback = (req, res, next) =>{
    try {
        passport.authenticate(
            'google',
            {failureRedirect: '/'},
            (err, user, info) =>{
                if(err) return next(err);

                const {userId, email} = user;
                const token = jwt.sign({userId}, process.env.MY_KEY, {
                    expiresIn: '24h',
                });

                result = {
                    userId,
                    token,
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

// const appleCallback = (req, res, next) =>{
//     try {
//         passport.authenticate(
//             "apple",

//             { failureRedirect: "/" },
//             (err, user, info) =>{
//                 console.log("콜백 함수입니다.")
//                 if (err) return next(err);
//                 const idToken = jwt.decode(profile);
//                 console.log(idToken,"이건가요")
//                 const {userId, email, name} = user;

//                 const token = jwt.sign({userId}, process.env.MY_KEY, {
//                     expiresIn:"24h",
//                 });
//                 console.log(token, '토큰을 보여줘!')
//                 result = {
//                     userId,
//                     email,
//                     name,
//                     token
//                 };
//                 res.send({user:result});
//             }
//         )(req, res, next);
//     } catch (error) {
//         res.status(400).send({errorMessage:"애플 로그인 실패"});
//     }
// }

// 에플로그인 apple-auth

const auth = new AppleAuth(config, fs.readFileSync('./config/AuthKey_P7344SBK66.p8').toString(), 'text')

const apple_auth =  async ( req, res, next) =>{
    // try {
        console.log(Date().toString() + "GET /apple");
        const response = await auth.accessToken(req.body.code);
        console.log(response, 'accessToken?')
        const idToken = jwt.decode(response.id_token);

        const User ={};
        User.id = idToken.sub;
        if (idToken.email) User.email = idToken.email;
        console.log(User.email, "유저.email");
        console.log(idToken.email, "아이디 토큰 이메일");
        if(req.body.User){
            const {name} = JSON.parse(req.body.User);
            User.name = name;
        }
        console.log(User.name, 'user.name');
        console.log(User, '유저정보');
        const exUser = await user.find({
            $or:[{userId: idToken.sub}]
        });
        console.log(exUser, '저장된 에플 id 코드')
        if(exUser) {
            const {userId, email} = user;
            const token = jwt.sign({userId}, process.env.MY_KEY, {
               expiresIn:"24" 
            });
            result = {
                userId,
                token,
                email
            };
            // res.send({User:result});
            done(null, exUser);

        }else {
            const newUser = await user.create({
                userId : idToken.sub,
                email : idToken.email
            });
            done(null, newUser);
            console.log(newUser, '신규유저')

        }
    // } catch (error) {
    //     throw new Error(500, err); 
    // }
}

const apple_refresh = async(req, res) =>{
    try {
        console.log(Date().toString() + "GET /refresh");
        const accessToken = await auth.refreshToken(req.query.refreshToken);
        res.json(accessToken);
    } catch (ex) {
        console.error(ex);
        res.send('에러발생')
    }
}

const tokenG = (req, res) =>{
    console.log('토큰 가지고 오나요');
    res.send(auth._tokenGenerator.generate());
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
    // appleCallback,
    localSignup,
    apple_auth,
    apple_refresh,
    tokenG,
    
    
};