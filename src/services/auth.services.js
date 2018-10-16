const passport = require('passport'),
LocalStrategy = require('passport-local'),
User = require('../modules/users/user.model'),
constants = require('../config/constants');

const JWTStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const localOpts = {
    usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await User.findOne({
            email
        });
        if(!user) {
            return done(null, false);
        } else if (!user.authenticateUser(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

// Jwt strategy
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: constants.JWT_SECRET,
};

const jwtStrategy = new JWTStrategy( jwtOpts, async (payload, done) => {
try {
    //Identify user by ID
    const user = await User.findById(payload._id);

    if (!user) {
    return done(null, false);
    }
    return done(null, user);
} catch (e) {
    return done(e, false);
}
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const authLocal = passport.authenticate('local', { session: false }),
authJwt = passport.authenticate('jwt', { session: false });

module.exports = { authLocal, authJwt };