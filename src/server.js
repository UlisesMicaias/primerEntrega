

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/products', (req, res) => res.render('products'));
app.get('/cart', (req, res) => res.render('cart'));
