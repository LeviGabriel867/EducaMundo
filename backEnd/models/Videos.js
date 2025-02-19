import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema({
    URLs: {type: String, require: true},
    category: {type: String, require: true},
}, {collection: "videos"});

const VideosModel = mongoose.model("videos", VideosSchema );

export {VideosModel}