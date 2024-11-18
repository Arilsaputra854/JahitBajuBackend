import express from "express"
import userController from "../controller/user-controller.js"
import productController from "../controller/product-controller.js"; 


const publicRouter = express.Router()
publicRouter.post("/api/users/register", userController.register)
publicRouter.post("/api/users/login", userController.login)

// Route for getting all product
publicRouter.get("/api/products", productController.list);

export {
    publicRouter
}