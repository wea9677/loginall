const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user = require('../model/user');
module.exports = () => {
    //회원가입

    passport.use ('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        user.findOne({'email':email}, function (err, user){
            if (err) return done(null);

            if (user) return done(null, false, req.flash('signupMessage','중복된 아이디입니다.'))

            const newUser = new user();
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            
            newUser.save(function (err) {
                if(err) throw err;
                return done(null, newUser);
            });
        })
    }));
    
    
    passport.use
    ('local-login',
        new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        function(email, password, done) {
            user.findOne({email:email}, function (err, user) {
                if (err) { return done(err);}
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
    
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {message: 'Incorrect password.'});
                }
                return done(null, user);
            })
        }
    ))
    
}


