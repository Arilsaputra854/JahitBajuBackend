import { upload } from "../config/multer.js"; // Sesuaikan path
import fs from "fs";
import path from "path";

const customDesign = async (req, res, next) => {
  try {
    upload.single("custom-design")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error uploading file",
          details: err.message || err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const newFilename = req.body.filename;
      if (!newFilename) {
        return res.status(400).json({
          error: true,
          message: "Filename is required",
        });
      }

      const newFullPath = path.join(req.file.destination, newFilename);

      if (fs.existsSync(newFullPath)) {
        fs.unlinkSync(newFullPath);
      }

      fs.renameSync(req.file.path, newFullPath);

      res.status(200).json({
        error: false,
        message: "File uploaded successfully",
        file: {
          originalname: req.file.originalname,
          path: newFullPath,
          filename: newFilename,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};

const lookDesign = async (req, res, next) => {
  try {
    upload.single("look-design")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error uploading file",
          details: err.message || err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const newFilename = req.body.filename;
      if (!newFilename) {
        return res.status(400).json({
          error: true,
          message: "Filename is required",
        });
      }

      const newFullPath = path.join(req.file.destination, newFilename);

      if (fs.existsSync(newFullPath)) {
        fs.unlinkSync(newFullPath);
      }

      fs.renameSync(req.file.path, newFullPath);

      res.status(200).json({
        error: false,
        message: "File uploaded successfully",
        file: {
          originalname: req.file.originalname,
          path: newFullPath,
          filename: newFilename,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};

const productImage = async (req, res, next) => {
  try {
    upload.single("product-image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error uploading file",
          details: err.message || err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const newFilename = req.body.filename;
      if (!newFilename) {
        return res.status(400).json({
          error: true,
          message: "Filename is required",
        });
      }

      const newFullPath = path.join(req.file.destination, newFilename);

      if (fs.existsSync(newFullPath)) {
        fs.unlinkSync(newFullPath);
      }

      fs.renameSync(req.file.path, newFullPath);

      res.status(200).json({
        error: false,
        message: "File uploaded successfully",
        file: {
          originalname: req.file.originalname,
          path: newFullPath,
          filename: newFilename,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};


const appBanner = async (req, res, next) => {
  try {
    upload.single("app-banner")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error uploading file",
          details: err.message || err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const newFilename = req.body.filename;
      if (!newFilename) {
        return res.status(400).json({
          error: true,
          message: "Filename is required",
        });
      }

      const newFullPath = path.join(req.file.destination, newFilename);

      if (fs.existsSync(newFullPath)) {
        fs.unlinkSync(newFullPath);
      }

      fs.renameSync(req.file.path, newFullPath);

      res.status(200).json({
        error: false,
        message: "File uploaded successfully",
        file: {
          originalname: req.file.originalname,
          path: newFullPath,
          filename: newFilename,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};

const lookTexture = async (req, res, next) => {
  try {
    upload.single("look-texture")(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Error uploading file",
          details: err.message || err,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: true,
          message: "No file uploaded",
        });
      }

      const newFilename = req.body.filename;
      if (!newFilename) {
        return res.status(400).json({
          error: true,
          message: "Filename is required",
        });
      }

      const newFullPath = path.join(req.file.destination, newFilename);

      if (fs.existsSync(newFullPath)) {
        fs.unlinkSync(newFullPath);
      }

      fs.renameSync(req.file.path, newFullPath);

      res.status(200).json({
        error: false,
        message: "File uploaded successfully",
        file: {
          originalname: req.file.originalname,
          path: newFullPath,
          filename: newFilename,
        },
      });
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  const { filename } = req.params;
  try {
    let folderPath;
    // Tentukan folder berdasarkan pola pada nama file
    if (filename.includes("product_")) {
      folderPath = "./uploads/product-images";
    } else if (filename.includes("look_design")) {
      folderPath = "./uploads/look-designs";
    } else if (filename.includes("app_banner_")) {
      folderPath = "./uploads/app-banners";
    } else if (filename.includes("look_texture")) {
      folderPath = "./uploads/look-textures";
    } else if (filename.includes("custom_")) {
      folderPath = "./uploads/custom-design-svg";
    } else {
      folderPath = "./uploads/others";
    }

    const filePath = path.join(folderPath, filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(path.resolve(filePath));
    } else {
      res.status(404).json({ error: true, message: "File not found" });
    }
  } catch (e) {
    next(e);
  }
};


export default {
  customDesign,
  productImage,
  lookTexture,
  lookDesign,
  appBanner,
  get,
};
