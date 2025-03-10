import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import PDFDocument from "pdfkit";
import connectDB from "./config/dataBase/ConnectDB.js";
import { ActivitiesModel } from "./models/Activities.js"; 

dotenv.config();

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

// 📌 Rota para acessar todas as atividades
app.get("/activities", async (req, res) => {
  try {
    const {category} = req.query;
    const activities = category ? await ActivitiesModel.find({category}) : [] ;
    res.json(activities)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


// 📌 Rota para cadastrar URLs de vídeos
app.post("/uploadVideos", async (req, res) => {
  try {
    const { category, URLs } = req.body;

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

// 📌 Rota para acessar vídeos por categoria
app.get("/uploadVideos", async (req, res) => {
  try {
    const { category } = req.query;
    const videos = category ? await VideosModel.find({ category }) : await VideosModel.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
const PORT = 8080;
(async () => {
  try {
    await connectDB();
    console.log("Database connected. Starting server...");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
