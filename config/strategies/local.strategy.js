const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../../src/Models/userModel');
const bcrypt = require('bcrypt');

function localStrategy() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async function (email, password, done) {
            try {
                const user = await User.findOne({ where: { email: email } });
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (!isMatch) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    ));
}

module.exports = localStrategy;