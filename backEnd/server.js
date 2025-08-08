import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dataBase/ConnectDB.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import activitiesRoutes from "./routes/activitiesRoutes.js";
import suggestionsRoutes from "./routes/suggestionsRoutes.js";
import videosRoutes from "./routes/videosRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const API_PREFIX = process.env.API_PREFIX || "/api";

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/activities`, activitiesRoutes);
app.use(`${API_PREFIX}/suggestions`, suggestionsRoutes);
app.use(`${API_PREFIX}/videos`, videosRoutes);

const PORT = process.env.PORT || 8080;
(async () => {
    try {
        await connectDB();
        console.log("Database connected. Starting server...");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`API prefix: ${API_PREFIX}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
    }
})();