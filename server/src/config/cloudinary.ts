import { v2 as cloudinary } from "cloudinary";
import process from "process";

export const initCloudinary = (): void => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  console.log("Cloudinary configured");
};

export default cloudinary;