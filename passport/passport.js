const passport = require('passport');
const google = require('./google');
// const apple = require('./apple');


module.exports = () =>{

    passport.serializeUser((user, done) =>{
        // console.log(user, '직렬화 구간');

        done(null,user);
    });

    passport.deserializeUser((user, done) =>{
        // console.log(user, '역직렬화 구간');
        done(null, user);
    });

    google();

    // apple();
}