import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { UserModel } from '../../models/User.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Middleware para verificar o token
function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso negado!' });
    }

    try {
        const secret = process.env.SECRET;
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id; // Salva o ID do usuário autenticado na requisição
        next();
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
}

// Rota de cadastro
app.post('/auth/register', async (req, res) => {
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
});

// Rota de login
app.post('/auth/login', async (req, res) => {
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
});

// Rota para buscar usuário por ID (protegida por token)
app.get('/users/:id', checkToken, async (req, res) => {
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
});

// Conectar ao banco de dados e iniciar o servidor
const PORT = 4080;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

app.listen(PORT, async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@lifeFit.kpf5o.mongodb.net/educaMundo?retryWrites=true&w=majority&appName=lifefit`);
        console.log('Database connected successfully');
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
});
