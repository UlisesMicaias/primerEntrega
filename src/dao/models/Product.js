import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    stock: Number,
    category: String,
    image: String
});

export default mongoose.model('Product', productSchema);
