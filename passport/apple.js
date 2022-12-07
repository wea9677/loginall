const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
// const user = require('../model/user');

module.exports = () =>{
    passport.use(
        new AppleStrategy(
            {
                clientID: 'com.herokuapp.applepassport-web',
                teamId:'3L7RW74HCJ',
                callbackURL: 'loginall-wea9677.koyeb.app/auth/apple', 
                keyID: '79KCA9TG7S',
                privatekeyLocation: fs.readFileSync('./AuthKey_79KCA9TG7S.p8'),
                scope: 'name email'
            }, async (req, accessToken, refreshToken, idToken, profile, cb) =>{
                console.log('데이터 지니가나요',
                    idToken, accessToken, refreshToken, profile
                )
            }
        )
    )




};

