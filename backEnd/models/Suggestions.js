import mongoose from "mongoose";

const SuggestionSchema = new mongoose.Schema({
    suggestionsUsers:{type:String, require:true}
}, {collection: "suggestions"})

const SuggestionsModel = mongoose.model("suggestions", SuggestionSchema)
export {SuggestionsModel}