
import { SuggestionsModel } from '../models/Suggestions.js';
import PDFDocument from 'pdfkit';
import { ObjectId } from 'mongodb';

export async function createSuggestion(req, res) {
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
}

export async function getSuggestions(req, res) {
    try {
        const suggestions = await SuggestionsModel.find();
        res.json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


export async function deleteSuggestion(req, res) {
    try {
        const id = new ObjectId(req.params.id); 
        const suggestionForDelete = await SuggestionsModel.deleteOne({ _id: id });

        if (suggestionForDelete.deletedCount === 0) {
            return res.status(404).json({ msg: "Suggestion not found" });
        }

        return res.status(200).json({ msg: "Suggestion deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error deleting suggestion", error: error.message });
    }
}

export async function downloadSuggestionsPDF(req, res) {
    try {
        const suggestions = await SuggestionsModel.find();

        if (!suggestions || suggestions.length === 0) {
            return res.status(404).json({ error: "Suggestions not found" });
        }

        const doc = new PDFDocument({ size: "A4", margins: { top: 50, left: 50, right: 50, bottom: 50 } });
        const fileName = "sugestoes_dos_usuarios.pdf";
        res.setHeader("Content-Disposition", `attachment; filename=\"${fileName}\"`);
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);
        doc.fontSize(20).font('Helvetica-Bold').text("Lista de Sugestões dos Usuários", { align: "center" });
        doc.moveDown(1);
        suggestions.forEach((suggestion, index) => {
            const backgroundColor = index % 2 === 0 ? '#f0f8ff' : '#e6f7ff';
            const textColor = '#000000';
            const textHeight = doc.heightOfString(`${index + 1}. ${suggestion.suggestionsUsers}`, {
                width: 500,
                fontSize: 12,
            });
            const rectHeight = textHeight + 10;
            doc.rect(50, doc.y, 500, rectHeight).fill(backgroundColor);
            doc.fontSize(12)
                .fillColor(textColor)
                .text(`${index + 1}. ${suggestion.suggestionsUsers}`, 60, doc.y + 5, {
                    width: 480,
                    align: 'left',
                });
            doc.moveDown(0.5);
        });
        doc.end();
    } catch (error) {
        console.error("❌ Erro ao gerar PDF:", error);
        res.status(500).json({ error: "Erro ao gerar o PDF" });
    }
}
