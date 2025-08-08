import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import cloudinary from '../config/cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "educa-mundo",
        allowed_formats: ["jpeg", "png", "gif", "webp"],
        transformation: [{ width: 1000, height: 1000, crop: "limit" }],
    },
});

const upload = multer({ storage });
export default upload;
