const passport = require('passport');
const AppleStrategy = require('passport-apple').Strategy;
const user = require('../model/user');
const fs = require('fs');
module.exports = () => {
    passport.use(
        new AppleStrategy(
            {
                clientID: 'app.koyeb.loginall',
                teamId:'3L7RW74HCJ',
                callbackURL: 'https://api.sprataprac.shop/oauth/apple/callback', 
                keyID: 'X6WB7MSR33',
                privatekeyLocation: fs.readFileSync('./AuthKey_X6WB7MSR33.p8'),
                scope: 'name email'
            }, async (req, accessToken, refreshToken, idToken, profile, cb) =>{
                console.log('데이터 지니가나요',
                    idToken, accessToken, refreshToken, profile
                );
                try {
                    const exUser = await user.findOne({
                        where: {userId:idToken, provider : 'apple'},
                    });

                    if(exUser) {
                        done(null, exUser);

                    }else{
                        const newUser = await user.create({
                            userId : idToken.sub,
                            email : idToken.email
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            },
        ),
    );


};

