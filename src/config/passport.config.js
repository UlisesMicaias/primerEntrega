import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../dao/models/User.js';
import { createHash, isValidPassword } from '../utils/hash.js';

export function initializePassport(JWT_SECRET) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET no está definido');
    }

    passport.use('register', new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        const { first_name, last_name, age } = req.body;
        try {
            const exists = await User.findOne({ email });
            if (exists) return done(null, false);
            const hashedPassword = createHash(password);
            const newUser = await User.create({ first_name, last_name, age, email, password: hashedPassword });
            done(null, newUser);
        } catch (err) {
            done(err);
        }
    }));

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user || !isValidPassword(user, password)) return done(null, false);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (!user) return done(null, false);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }));
}
