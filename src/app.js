import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

import sessionRouter from './routes/sessions.router.js';
import mongoose from 'mongoose';
import { initializePassport } from './config/passport.config.js';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

await mongoose.connect(process.env.MONGO_URI);

initializePassport(process.env.JWT_SECRET);
app.use(passport.initialize());

app.use('/api/sessions', sessionRouter);

app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/profile', (req, res) => res.send('Vista protegida'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor activo en puerto ${process.env.PORT}`);
});
