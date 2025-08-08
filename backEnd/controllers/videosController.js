import { VideosModel } from '../models/Videos.js';
import axios from 'axios';

export async function uploadVideos(req, res) {
    try {
        const { category, URLs } = req.body;

        if (!category || !URLs) {
            return res.status(400).json({ msg: "Category and URLs are required" });
        }

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
}

export async function getVideosWithTitles(req, res) {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ msg: "Category query parameter is required" });
        }

        if (!YOUTUBE_API_KEY) {
            return res.status(500).json({ msg: "YouTube API key not configured on server." });
        }

        const videosFromDB = await VideosModel.find({ category });

        if (!videosFromDB || videosFromDB.length === 0) {
            return res.status(404).json({ msg: "No videos found for this category" });
        }

        const videoIds = videosFromDB.map(video => {
            let id = null;
            try {
                const url = new URL(video.URLs);
                if (url.hostname === "youtu.be") {
                    id = url.pathname.substring(1);
                } else if (url.hostname.includes("youtube.com")) {
                    id = url.searchParams.get("v");
                }
                if (id && id.includes('?')) {
                    id = id.split('?')[0];
                }
            } catch (e) {
                console.warn(`URL inválida encontrada: ${video.URLs}`);
            }
            return id;
        }).filter(id => id);

        if (videoIds.length === 0) {
            console.warn(`Nenhum ID de vídeo válido encontrado para a categoria: ${category}`);
            return res.json(videosFromDB.map(video => ({
                ...video.toObject(),
                title: "Título não disponível (ID inválido)"
            })));
        }

        const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds.join(",")}&key=${YOUTUBE_API_KEY}&part=snippet`;

        let youtubeResponse;
        try {
            youtubeResponse = await axios.get(youtubeApiUrl);
        } catch(apiError) {
            console.error("Erro ao chamar a API do YouTube:", apiError.response?.data || apiError.message);
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

        const youtubeItemsMap = new Map();
        youtubeResponse.data.items.forEach(item => {
            youtubeItemsMap.set(item.id, item.snippet.title);
        });

        const videoDataWithTitles = videosFromDB.map(video => {
            const videoId = videoIds.find(id => video.URLs.includes(id));
            const title = videoId ? youtubeItemsMap.get(videoId) : null;
            return {
                ...video.toObject(),
                title: title || "Título não disponível"
            };
        });

        res.json(videoDataWithTitles);
    } catch (error) {
        console.error("❌ Erro na rota /videosWithTitles:", error);
        res.status(500).json({ msg: "Erro interno do servidor ao buscar vídeos com títulos", error: error.message });
    }
}
