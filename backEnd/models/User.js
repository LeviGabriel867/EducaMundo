import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{ type:String, require:true },
    password: {type: String, require:true }
}, {collection: "users"});

const UserModel = mongoose.model("users", UserSchema)
export {UserModel};