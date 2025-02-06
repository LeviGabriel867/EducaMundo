import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { ActivitiesModel } from "./models/Activities.js"; // Importando o modelo corrigido
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors( ))

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Pasta onde os arquivos serão salvos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file .originalname); // Se eu quiser adicionar multiplos arquvios usar o FILES
  }
});

const upload = multer({ storage });

// Rota para upload de uma única imagem e criação de uma atividade
app.post("/single", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    // Extrai os dados do arquivo e do corpo da requisição
    const { path } = req.file; // Caminho do arquivo salvo
    const { name, category } = req.body; // Dados da atividade

    // Cria uma nova atividade no banco de dados
    const newActivity = new ActivitiesModel({
      name,
      path,
      category,
    });

    await newActivity.save(); // Salva a atividade no banco de dados
    res.send({ msg: "Activity uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to save the activity" });
  }
});

app.get("/activities", async (req, res) => {
  try {
    const {category} = req.query;
    const activities = category ? await ActivitiesModel.find({category}) : alert("Sem atividades cadastradas") ;
    res.json(activities)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Iniciar o servidor e conectar ao banco de dados
const PORT = 8080;
app.listen(PORT, async () => {
  try {
    // Conecta ao banco de dados MongoDB
    await mongoose.connect("mongodb+srv://levigabriel:levi40028922@lifeFit.kpf5o.mongodb.net/educaMundo?retryWrites=true&w=majority&appName=lifefit");
    console.log("Database connected successfully");
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Encerra o processo se a conexão com o banco de dados falhar
  }
});