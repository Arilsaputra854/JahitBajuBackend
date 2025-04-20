import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folderPath = "";

    switch (file.fieldname) {
      case "product-image":
        folderPath = "./uploads/product-images";
        break;
      case "look-design":
        folderPath = "./uploads/look-designs";
        break;
      case "look-texture":
        folderPath = "./uploads/look-textures";
        break;
      case "app-banner":
        folderPath = "./uploads/app-banners";
        break;
      case "custom-design":
        folderPath = "./uploads/custom-design-svg";
        break;
      default:
        folderPath = "./uploads/others";
    }

    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const field = file.fieldname;

  if (
   ( field === "product-image" ||field === "look-texture" || field === "app-banner") &&
    (ext === ".png" || ext === ".jpg" || ext === ".jpeg")
  ) {
    cb(null, true);
  } else if (
    (field === "custom-design" || field === "look-design") &&
    ext === ".svg"
  ) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for field "${field}".`), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: fileFilter,
});

export { upload };
