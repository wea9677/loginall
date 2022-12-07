const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {
    passport.use
    (
        new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({email:email}, function (err, user) {
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


