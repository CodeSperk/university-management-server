import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

// Configuration
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImgToCloudinary = async (imgName: string, path: string) => {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imgName,
    })
    .catch((error) => {
      throw new Error(error);
    });

  //delete file after upload
  fs.unlink(path, (err) => {
    if (err) {
      throw new Error(err);
    } else {
      console.log('file is deleted');
    }
  });

  return uploadResult;
};

//to upload file at the root
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
