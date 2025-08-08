
import mongoose from 'mongoose';
import { UserModel } from '../models/User.js';

export async function getUserById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'ID inválido' });
    }

    try {
        const user = await UserModel.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao buscar usuário' });
    }
}
