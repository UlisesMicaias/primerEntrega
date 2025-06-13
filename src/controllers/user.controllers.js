import User from '../dao/models/User.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find().lean();
    res.render('users', { users, title: 'Usuarios', page: 'users' });
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.uid).lean();
    res.render('userDetail', { user, title: 'Detalle de Usuario', page: 'userDetail' });
};

export const updateUser = async (req, res) => {
    const updated = await User.findByIdAndUpdate(req.params.uid, req.body, { new: true });
    res.json(updated);
};

export const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.uid);
    res.redirect('/users');
};
