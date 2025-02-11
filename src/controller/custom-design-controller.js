import { upload } from "../config/multer.js"; // Sesuaikan path
import fs from 'fs';
import path from 'path';

const add = async (req, res, next) => {
  try {
    // Gunakan multer untuk menangani upload file
    upload.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: true, message: 'Error uploading file', details: err });
      }

      // Setelah berhasil upload
      res.status(200).json({
        error: false,
        message: 'File uploaded successfully',
        file: req.file // Mengembalikan data file yang di-upload
      });
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
    const { filename } = req.params; 
  try {
    // Ambil file yang sudah di-upload
    const filePath = `./uploads/${filename}`;

    // Cek apakah file ada
    if (fs.existsSync(filePath)) {
      res.sendFile(path.resolve(filePath));
    } else {
      res.status(404).json({ error: true, message: 'File not found' });
    }
  } catch (e) {
    next(e);
  }
};

export default {
  add,
  get
};
