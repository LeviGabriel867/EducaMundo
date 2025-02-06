import mongoose from "mongoose";

const ActivitiesSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  path: { type: String, required: true }, 
  category: { type: String, required: true }, 
  dateUpload: { type: Date, default: Date.now }, 
}, {collection: "activities"});

// Cria o modelo "activities"
const ActivitiesModel = mongoose.model("activities", ActivitiesSchema);

// Exporta o modelo usando ES Modules
export { ActivitiesModel };