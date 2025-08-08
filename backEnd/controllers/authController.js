
import { UserModel } from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    const { email, password, confirmpassword } = req.body;

    if (!email) {
        return res.status(422).json({ msg: 'Insira um e-mail válido' });
    }
    if (!password) {
        return res.status(422).json({ msg: 'Insira uma senha' });
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas precisam ser iguais' });
    }

    // Verifica se o usuário já existe
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
        return res.status(422).json({ msg: 'Usuário já cadastrado, faça login' });
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            email,
            password: passwordHash,
        });

        await newUser.save();
        res.status(201).json({ msg: 'Usuário criado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro ao criar usuário' });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email) {
        return res.status(422).json({ msg: 'E-mail obrigatório' });
    }
    if (!password) {
        return res.status(422).json({ msg: 'Senha é obrigatória' });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
        return res.status(422).json({ msg: 'Usuário não encontrado' });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' });
    }

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

        res.status(200).json({ msg: 'Usuário autenticado', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor' });
    }
}
