import { ActivitiesModel } from '../models/Activities.js';
import PDFDocument from 'pdfkit';
import axios from 'axios';

export async function listActivities(req, res) {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};
        const activities = await ActivitiesModel.find(query);
        res.json(activities);
    } catch (error) {
        console.error("Erro ao listar atividades:", error);
        res.status(500).json({ error: "Erro ao listar atividades" });
    }
}

export async function createActivity(req, res) {
    try {
        if (!req.file || !req.file.path) {
            return res.status(400).send({ error: "No file uploaded" });
        }
        const { name, category, description } = req.body;
        const imageUrl = req.file.path; // URL da imagem na Cloudinary

        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "O campo 'name' (nome da atividade) é obrigatório." });
        }

        const newActivity = new ActivitiesModel({
            name,
            path: imageUrl, // Salva a URL
            category,
            description,
        });

        await newActivity.save();
        res.send({ msg: "Activity uploaded successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to save the activity" });
    }
}

export async function downloadActivityPDF(req, res) {
    try {
        const activitieForDownload = await ActivitiesModel.findById(req.params.id);
        if (!activitieForDownload) {
            return res.status(404).json({ error: "Activity not found" });
        }

        const imageUrl = activitieForDownload.path;
        // Baixar a imagem remota
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", `attachment; filename=${activitieForDownload.name}.pdf`);
        res.setHeader("Content-Type", "application/pdf");

        doc.pipe(res);
        doc.image(imageBuffer, 50, 50, { width: 500 });
        doc.end();
    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).json({ error: "Error generating PDF" });
    }
}
