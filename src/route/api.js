import express from "express"
import userController from "../controller/user-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"
import productController from "../controller/product-controller.js"; // Update to product controller


const userRouter = express.Router()
const productRouter = express.Router();
userRouter.get("/api/users/current",authMiddleware, userController.get)

// Route for registering a new product
productRouter.post("/api/products", authMiddleware, productController.register); 

// Route for getting all product
productRouter.get("/api/products", authMiddleware, productController.list);

// Route for getting details of a specific product by ID
productRouter.get("/api/products/:id", authMiddleware, productController.get); // Get product by ID, no need for authMiddleware if it's a public endpoint

// Route for update details of a specific product by ID
productRouter.patch("/api/products/:id", authMiddleware, productController.update); 

// Route for delete a specific product by ID
productRouter.delete("/api/products/:id", authMiddleware, productController.remove); 

export {
    userRouter,
    productRouter
}

