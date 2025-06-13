import { Router } from 'express';
import User from '../dao/models/User.js';

const router = Router();

router.get('/', async (req, res) => res.json(await User.find()));
// Agrega rutas PUT, DELETE, GET by ID si lo necesitás más adelante.

export default router;
