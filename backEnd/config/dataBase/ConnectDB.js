import mongoose from "mongoose"
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(process.cwd(), '.env')});

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const MONGODB_URI = `mongodb+srv://${username}:${password}@lifeFit.kpf5o.mongodb.net/educaMundo?retryWrites=true&w=majority&appName=lifefit`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
export default connectDB;
