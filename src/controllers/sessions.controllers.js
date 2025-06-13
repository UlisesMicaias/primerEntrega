import jwt from 'jsonwebtoken';

export const register = (req, res) => {
    res.json({ status: 'success', message: 'Usuario registrado' });
};

export const login = (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res
        .cookie('jwt', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        })
        .json({ message: 'Login exitoso', token });
};

export const current = (req, res) => {
    res.json({ user: req.user });
};

export const logout = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logout' })
};
