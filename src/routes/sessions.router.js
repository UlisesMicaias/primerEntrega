import { Router } from 'express';
import passport from 'passport';
import {
    register,
    login,
    current,
    logout
} from '../controllers/sessions.controllers.js';

const router = Router();

router.post(
    '/register',
    passport.authenticate('register', { session: false }),
    register
);

router.post(
    '/login',
    passport.authenticate('login', { session: false }),
    login
);

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    current
);

router.get('/logout', logout);

export default router;


