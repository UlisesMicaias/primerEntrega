import { createUser, findUserByEmail } from '../services/user.service.js';
import { createHash, isValidPassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const register = async (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const newUser = await createUser({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        cart: null
    });

    res.status(201).json({ status: 'success', user: newUser });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !isValidPassword(user, password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};

export const current = (req, res) => {
    res.status(200).json({ user: req.user });
};
