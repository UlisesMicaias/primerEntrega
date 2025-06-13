import { Router } from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/user.controllers.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:uid', getUserById);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;

