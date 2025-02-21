import express from "express";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import multer from "multer";
import { ActivitiesModel } from "./models/Activities.js"; // Importando o modelo corrigido
import cors from "cors"
import connectDB from './config/dataBase/ConnectDB.js'
import { VideosModel } from "./models/Videos.js";
import { SuggestionsModel } from "./models/Suggestions.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors( ))
app.use("/uploads", express.static("uploads"));

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
    const { name, category, description } = req.body; // Dados da atividade

    // Cria uma nova atividade no banco de dados
    const newActivity = new ActivitiesModel({
      name,
      path,
      category,
      description,
    });

    await newActivity.save(); // Salva a atividade no banco de dados
    res.send({ msg: "Activity uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to save the activity" });
  }
});

//Rota para acessar todas atividades
app.get("/activities", async (req, res) => {
  try {
    const {category} = req.query;
    const activities = category ? await ActivitiesModel.find({category}) : [] ;
    res.json(activities)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})



//Rota para cadastrar URLs de vídeos
app.post("/uploadVideos", async (req, res) => {
  try {
    const { category, URLs } = req.body;

    // Verificação básica dos campos obrigatórios
    if (!category || !URLs) {
      return res.status(400).json({ msg: "Category and URLs are required" });
    }

    const newVideo = new VideosModel({ URLs, category });

    await newVideo.save();
    res.status(201).json({ msg: "Video uploaded successfully" });
  } catch (error) {
    console.error("Error in uploaded URL:", error);
    res.status(500).json({ msg: "Error in uploaded URL", error: error.message });
  }
});


//Rota para acessar vídeos
app.get('/uploadVideos', async (req, res) => {
  try {
    const {category} = req.query
    let videos

    if(category){
      videos = await VideosModel.find({category : category})
    }
    else{
      videos = []
    }
    res.json(videos)
  } catch (error) {
    res.status(500).json({error: error.message})
  } 
    
  
})

//Rota para usuário cadastrar sugestões

app.post('/suggestions', async(req, res) => {
  try {
    const {suggestionsUsers} = req.body

    if(!suggestionsUsers){
      return res.status(400).json({msg: "Preencha o campo corretamente"})
    }
    const newSuggestions = new SuggestionsModel({suggestionsUsers});

    await newSuggestions.save();
    res.status(200).json({msg:"Suggestion registered sucessfully"})
  } catch (error) {
    console.error("Error in register suggestion")
    res.status(500).json({msg: "Error in register suggestion", error: error.message})
  }
})

//Rota para visualizar sugestões dos usuários

app.get('/suggestions', async(req, res) => {
  try {
    let suggestions = await SuggestionsModel.find()
    res.json(suggestions)
  } catch (error) {
    console.error(error)
    res.status(500).json({error:error.message})
  }
})

// Iniciar o servidor e conectar ao banco de dados
const PORT = 8080;

(async () => {
  try {
    await connectDB()
    console.log("Database connected. Starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`) })
  } catch (error) {
    console.log(error)
  }
 
 
})()
