// const passport = require('passport');
// const AppleStrategy = require('passport-apple').Strategy;
// const user = require('../model/user');
// const path = require('path');
// const fs = require('fs');


// module.exports = () => {
//     passport.use(
//         new AppleStrategy(
//             {
//                 clientID: 'shop.sprataprac.api',
//                 teamId:'3L7RW74HCJ',
//                 callbackURL: 'https://api.sprataprac.shop/oauth/apple/callback', 
//                 keyID: 'P7344SBK66',
//                 // privateKeyString:`-----BEGIN PRIVATE KEY-----
//                 // MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgTX4mocod+MNTP+nc
//                 // OplsNxtHv+/TX6DfTRvhQgsveICgCgYIKoZIzj0DAQehRANCAAT2wwIkOpOw686G
//                 // htu3IpsodOa+NRca+UHr/AD3OQGyf65AbZxXbmg/8hzXez6VeYOh/XZlmi/hCZrn
//                 // f7M6jdrM
//                 // -----END PRIVATE KEY-----`,
//                 passReqToCallback: true,
//                 privateKeyLocation:fs.readFileSync('/home/ubuntu/loginall/passport/AuthKey_P7344SBK66.p8','utf8').toString(),

//                 // scope: 'name email'
//             }, async (req, accessToken, refreshToken, idToken, profile, cb) =>{
//                 console.log('데이터 지니가나요',
//                     idToken, accessToken, refreshToken, profile
//                 );
//                 // try {
//                     const exUser = await user.findOne({
//                         where: {userId:idToken, provider : 'apple'},
//                     });

//                     if(exUser) {
//                         done(null, exUser);

//                     }else{
//                         const newUser = await user.create({
//                             userId : idToken.sub,
//                             email : idToken.email
//                         });
//                         done(null, newUser);
//                     }
//                 // } catch (error) {
//                 //     console.error(error);
//                 //     done(error);
//                 // }
//             },
//         ),
//     );


// };

