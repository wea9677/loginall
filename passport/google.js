const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const user = require('../model/user');

 
module.exports = () => {
   passport.use(
      new GoogleStrategy(
         {
            clientID: process.env.GOOGLE_ID, // 구글 로그인에서 발급받은 REST API 키
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK, // 구글 로그인 Redirect URI 경로
         },
         async (request, accessToken, refreshToken, profile, done) => {
            console.log('google profile : ', profile);
            try {
               const exUser = await user.findOne({
                  // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
                  where: { userId: profile.id, provider: 'google' },
               });
               console.log(exUser, ' 여기는 이미 있는지 확인')
               // 이미 가입된 구글 프로필이면 성공
               if (exUser) {
                  done(null, exUser); // 로그인 인증 완료
               } else {
                  // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                  const newUser = await user.create({
                     userId: profile.id,
                     email: profile.emails[0].value,
                     // name: profile.displayName,
                     provider: 'google',
                  });
                  done(null, newUser); // 회원가입하고 로그인 인증 완료
               }
            } catch (error) {
               console.error(error);
               done(error);
            }
         },
      ),
   );
};