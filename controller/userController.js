require('dotenv').config();

const jwt = require('jsonwebtoken');
const passport = require('passport');



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

module.exports = {
    googleCallback,
    appleCallback
};