import express from "express";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
//import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import PDFDocument from "pdfkit";
import connectDB from "./config/dataBase/ConnectDB.js";
import { ActivitiesModel } from "./models/Activities.js"; 
import {SuggestionsModel} from './models/Suggestions.js'
//import { size } from "pdfkit/js/page";

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

//Rota para baixar atvidade em formato de PDf
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


//rota para classificar nivel de prioridade de sugestão

//rota para deletar sugestão


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
