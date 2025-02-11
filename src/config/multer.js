import multer from 'multer';
import path from 'path';

// Set folder penyimpanan file dan jenis file yang diperbolehkan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Folder tempat menyimpan file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang disimpan
  }
});

const upload = multer({ storage: storage });

export { upload };
