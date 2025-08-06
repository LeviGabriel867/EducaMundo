import express from "express";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import PDFDocument from "pdfkit";
import axios from "axios"; // 👈 Adicionado axios
import connectDB from "./config/dataBase/ConnectDB.js";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from './models/User.js';
import { ActivitiesModel } from "./models/Activities.js";
import { SuggestionsModel } from './models/Suggestions.js';
import { VideosModel } from "./models/Videos.js";

dotenv.config(); // 👈 Configurar dotenv no início
// 🔑 Obter a chave da API do YouTube das variáveis de ambiente
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
if (!YOUTUBE_API_KEY) {
    console.error("❌ ERRO FATAL: Variável de ambiente YOUTUBE_API_KEY não definida.");
    // Em um cenário real, você pode querer parar o servidor aqui: process.exit(1);
    // Por enquanto, vamos apenas avisar, mas a rota de títulos não funcionará.
}


// Criar servidor Express
const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Configuração do multer para upload de arquivos locais
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Pasta onde os arquivos serão salvos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

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

// Rota para baixar atividade em formato de PDF
app.get("/download/:id", async (req, res) => {
    try {
        const activitieForDownload = await ActivitiesModel.findById(req.params.id);
        if (!activitieForDownload) {
            return res.status(404).json({ error: "Activity not found" });
        }

        let imagePath = activitieForDownload.path;
        imagePath = imagePath.replace(/\\/g, "/"); // Corrigir caminhos do Windows

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Criar o documento PDF
        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", `attachment; filename=${activitieForDownload.name}.pdf`);
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);
        doc.image(imagePath, 50, 50, { width: 500 });
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
});


// Rota para deletar sugestão
app.delete("/deleteSuggestions/:id", async (req, res) => {
    try {
        const id = new ObjectId(req.params.id); // Converte ID para ObjectId
        const suggestionForDelete = await SuggestionsModel.deleteOne({ _id: id });

        if (suggestionForDelete.deletedCount === 0) {
            return res.status(404).json({ msg: "Suggestion not found" });
        }

        return res.status(200).json({ msg: "Suggestion deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error deleting suggestion", error: error.message });
    }
});


// Rota para baixar lista de sugestões em formato PDF
app.get("/downloadSuggestions", async (req, res) => {
    try {
        // 🔹 Busca todas as sugestões no banco de dados
        const suggestions = await SuggestionsModel.find();

        if (!suggestions || suggestions.length === 0) {
            return res.status(404).json({ error: "Suggestions not found" });
        }

        // 🔹 Criando o documento PDF
        const doc = new PDFDocument({ size: "A4", margins: { top: 50, left: 50, right: 50, bottom: 50 } }); // Margens para melhor visualização

        // 🔹 Configura o cabeçalho para download do arquivo PDF
        const fileName = "sugestoes_dos_usuarios.pdf";
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", "application/pdf");

        // 🔹 Enviar o PDF diretamente na resposta
        doc.pipe(res);

        // 🔹 Título do documento
        doc.fontSize(20).font('Helvetica-Bold').text("Lista de Sugestões dos Usuários", { align: "center" });
        doc.moveDown(1);

        // 🔹 Adicionando sugestões ao PDF com estilização
        suggestions.forEach((suggestion, index) => {
            // 🔹 Cor de fundo para cada sugestão (alternando cores)
            const backgroundColor = index % 2 === 0 ? '#f0f8ff' : '#e6f7ff'; // Alterna entre AliceBlue e um azul mais claro
            const textColor = '#000000'; // Cor do texto

            // 🔹 Calcula a altura do retângulo com base no texto
            const textHeight = doc.heightOfString(`${index + 1}. ${suggestion.suggestionsUsers}`, {
                width: 500, // Largura máxima para o texto
                fontSize: 12,
            });

            const rectHeight = textHeight + 10; // Adiciona padding vertical

            // 🔹 Desenha o retângulo de fundo
            doc.rect(50, doc.y, 500, rectHeight) // Posição x, y, largura, altura
                .fill(backgroundColor);

            // 🔹 Adiciona o texto formatado
            doc.fontSize(12)
                .fillColor(textColor)
                .text(`${index + 1}. ${suggestion.suggestionsUsers}`, 60, doc.y + 5, { // Posição x, y com um pequeno offset
                    width: 480, // Largura um pouco menor para o texto ficar dentro do retângulo
                    align: 'left',
                });

            doc.moveDown(0.5); // Espaçamento entre as sugestões
        });

        // 🔹 Finaliza o documento
        doc.end();
    } catch (error) {
        console.error("❌ Erro ao gerar PDF:", error);
        res.status(500).json({ error: "Erro ao gerar o PDF" });
    }
});


// 📌 Rota para upload de uma única imagem e criação de uma atividade
app.post("/single", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: "No file uploaded" });
        }

        const { path } = req.file; // Caminho do arquivo salvo
        const { name, category, description } = req.body; // Dados da atividade

        const newActivity = new ActivitiesModel({
            name,
            path: path.replace(/\\/g, "/"), // Corrigir caminhos no Windows
            category,
            description,
        });

        await newActivity.save();
        res.send({ msg: "Activity uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to save the activity" });
    }
});

// 📌 Rota para acessar todas as atividades por categoria
app.get("/activities", async (req, res) => {
    try {
        const { category } = req.query;
        // Retorna apenas se a categoria for fornecida, senão retorna array vazio
        const activities = category ? await ActivitiesModel.find({ category }) : [];
        res.json(activities)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


// --- ROTAS DE VÍDEOS ---

// 📌 Rota para cadastrar URLs de vídeos
app.post("/uploadVideos", async (req, res) => {
    try {
        const { category, URLs } = req.body;

        if (!category || !URLs) {
            return res.status(400).json({ msg: "Category and URLs are required" });
        }

        // Validação simples da URL (pode ser mais robusta)
        if (!URLs.includes("youtube.com") && !URLs.includes("youtu.be")) {
            return res.status(400).json({ msg: "Invalid YouTube URL format" });
        }

        const newVideo = new VideosModel({ URLs, category });
        await newVideo.save();

        res.status(201).json({ msg: "Video uploaded successfully" });
    } catch (error) {
        console.error("Error in uploaded URL:", error);
        res.status(500).json({ msg: "Error in uploaded URL", error: error.message });
    }
});

// 📌 Rota para acessar vídeos por categoria (retorna apenas URLs e categoria)
// Mantida para compatibilidade ou outros usos, mas a nova rota é preferível
app.get("/uploadVideos", async (req, res) => {
    try {
        const { category } = req.query;
        const videos = category ? await VideosModel.find({ category }) : await VideosModel.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ⭐ NOVA ROTA: Acessar vídeos por categoria COM TÍTULOS DO YOUTUBE ⭐
app.get("/videosWithTitles", async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ msg: "Category query parameter is required" });
        }

        if (!YOUTUBE_API_KEY) {
             // Se a chave não foi carregada, não podemos prosseguir
            return res.status(500).json({ msg: "YouTube API key not configured on server." });
        }

        // 1. Buscar vídeos do banco de dados
        const videosFromDB = await VideosModel.find({ category });

        if (!videosFromDB || videosFromDB.length === 0) {
            return res.status(404).json({ msg: "No videos found for this category" });
        }

        // 2. Extrair IDs válidos do YouTube
        const videoIds = videosFromDB.map(video => {
            // Tenta extrair ID de diferentes formatos de URL
            let id = null;
            try {
                const url = new URL(video.URLs);
                if (url.hostname === "youtu.be") {
                    id = url.pathname.substring(1); // Remove a barra inicial
                } else if (url.hostname.includes("youtube.com")) {
                    id = url.searchParams.get("v");
                }
                // Remove parâmetros extras do ID se houver (ex: ?si=...)
                if (id && id.includes('?')) {
                  id = id.split('?')[0];
                }
            } catch (e) {
                console.warn(`URL inválida encontrada: ${video.URLs}`);
            }
            return id;
        }).filter(id => id); // Filtra IDs nulos ou inválidos

        // 3. Se não houver IDs válidos, retornar vídeos com título padrão
        if (videoIds.length === 0) {
            console.warn(`Nenhum ID de vídeo válido encontrado para a categoria: ${category}`);
            return res.json(videosFromDB.map(video => ({
                ...video.toObject(),
                title: "Título não disponível (ID inválido)"
            })));
        }

        // 4. Buscar títulos na API do YouTube
        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}&part=snippet`;

        let youtubeResponse;
        try {
             youtubeResponse = await axios.get(youtubeApiUrl);
        } catch(apiError) {
            console.error("Erro ao chamar a API do YouTube:", apiError.response?.data || apiError.message);
            // Se a API falhar, retornar os vídeos com um título indicando o erro
             return res.json(videosFromDB.map(video => ({
                ...video.toObject(),
                title: "Erro ao buscar título do YouTube"
            })));
        }


        if (youtubeResponse.status !== 200) {
             console.error(`Erro da API do YouTube: ${youtubeResponse.status} ${youtubeResponse.statusText}`);
             return res.json(videosFromDB.map(video => ({
                ...video.toObject(),
                title: "Erro ao buscar título do YouTube"
            })));
        }

        // 5. Mapear títulos para os vídeos correspondentes
        const youtubeItemsMap = new Map();
        youtubeResponse.data.items.forEach(item => {
            youtubeItemsMap.set(item.id, item.snippet.title);
        });

        // 6. Combinar dados do DB com títulos e retornar
        const videoDataWithTitles = videosFromDB.map(video => {
            const videoId = videoIds.find(id => video.URLs.includes(id)); // Encontra o ID correspondente
            const title = videoId ? youtubeItemsMap.get(videoId) : null;

            return {
                ...video.toObject(), // Converte documento Mongoose para objeto JS
                title: title || "Título não disponível" // Adiciona o título ou um padrão
            };
        });

        res.json(videoDataWithTitles);

    } catch (error) {
        console.error("❌ Erro na rota /videosWithTitles:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao buscar vídeos com títulos", error: error.message });
    }
});


// --- ROTAS DE SUGESTÕES ---

// 📌 Rota para usuário cadastrar sugestões
app.post("/suggestions", async (req, res) => {
    try {
        const { suggestionsUsers } = req.body;

        if (!suggestionsUsers) {
            return res.status(400).json({ msg: "Preencha o campo corretamente" });
        }

        const newSuggestions = new SuggestionsModel({ suggestionsUsers });
        await newSuggestions.save();

        res.status(200).json({ msg: "Suggestion registered successfully" });
    } catch (error) {
        console.error("Error in register suggestion:", error);
        res.status(500).json({ msg: "Error in register suggestion", error: error.message });
    }
});

// 📌 Rota para visualizar sugestões dos usuários
app.get("/suggestions", async (req, res) => {
    try {
        const suggestions = await SuggestionsModel.find();
        res.json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Iniciar o servidor e conectar ao banco de dados
const PORT = process.env.PORT || 8080; // Usa a porta do .env ou 8080 como padrão
(async () => {
    try {
        await connectDB(); // Garante que a conexão com o DB está ativa
        console.log("Database connected. Starting server...");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
})();