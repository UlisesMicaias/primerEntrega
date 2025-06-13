import Product from '../dao/models/Product.js';

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.json(product);
};

export const createProduct = async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

export const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
};
