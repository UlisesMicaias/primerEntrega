import { Router } from 'express';
import {
    createCart,
    getCart,
    addToCart,
    deleteFromCart
} from '../controllers/carts.controllers.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCart);
router.post('/:cid/product/:pid', addToCart);
router.delete('/:cid/product/:pid', deleteFromCart);

export default router;
