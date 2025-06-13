import dotenv from 'dotenv';
import express from 'express';
import handlebars from 'express-handlebars';
import { engine } from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import { initializePassport } from './config/passport.config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionRouter from './routes/sessions.router.js';
import userRouter from './routes/users.router.js';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cookieParser());

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', engine({
    helpers: {
        eq: (a, b) => a === b
    }
}));

await mongoose.connect(process.env.MONGO_URI);

initializePassport(process.env.JWT_SECRET);
app.use(passport.initialize());



app.use('/api/sessions', sessionRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/users', userRouter);


app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});


app.get('/login', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/profile', (req, res) => res.send('Vista protegida'));
app.get('/products', (req, res) => res.render('products'));
app.get('/cart', (req, res) => res.render('cart'));

app.listen(process.env.PORT, () => {
    console.log(`Servidor activo en puerto ${process.env.PORT}`);
});
