const passport = require('passport');
const localStrategy = require('./strategies/local.strategy');
localStrategy();

function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = passportConfig;