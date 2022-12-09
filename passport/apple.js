const passport = require('passport');
const jwt = require('jsonwebtoken');
const AppleStrategy = require('passport-apple').Strategy;
const user = require('../model/user');
const fs = require('fs');
const path = require('path');
module.exports = () => {
    passport.use(
        new AppleStrategy(
            {
                clientID: 'app.koyeb.loginall',
                teamId:'3L7RW74HCJ',
                callbackURL: 'https://api.sprataprac.shop/oauth/apple/callback', 
                keyID: 'X6WB7MSR33',
                // privateKeyString:`-----BEGIN PRIVATE KEY-----
                // MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQg/CQM5PxN3SbJqEd3
                // vl1S5I3i/gVkLrdGjSKtjneciWegCgYIKoZIzj0DAQehRANCAARygNoeqR/bwMS8
                // AchJfcDnre3Z0TxumK5HJ3W5nxYzltDzqOdPFsCzIx87GlWKUB1tVQPXi8TpOZp0
                // ZLn/lXgh
                // -----END PRIVATE KEY-----`,
                privateKeyLocation:path.join(__dirname, "AuthKey_X6WB7MSR33.p8"),
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

