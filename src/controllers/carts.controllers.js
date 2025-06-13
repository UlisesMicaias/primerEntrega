import Cart from '../dao/models/Cart.js';

export const createCart = async (req, res) => {
    const newCart = await Cart.create({ products: [] });
    res.status(201).json(newCart);
};

export const getCart = async (req, res) => {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    res.json(cart);
};

export const addToCart = async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    const existingProduct = cart.products.find(p => p.product.toString() === pid);
    if (existingProduct) existingProduct.quantity += 1;
    else cart.products.push({ product: pid, quantity: 1 });
    await cart.save();
    res.json(cart);
};

export const deleteFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json(cart);
};
