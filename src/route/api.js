import express from "express"
import userController from "../controller/user-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"
import productController from "../controller/product-controller.js"; // Update to product controller
import orderController from "../controller/order-controller.js";


const userRouter = express.Router()
const productRouter = express.Router();
const orderRouter = express.Router();

// Route for registering a new user
userRouter.get("/api/users/current",authMiddleware, userController.get)


// Route for delete user
userRouter.delete("/api/users/:id",authMiddleware, userController.remove)

// Route for update user
userRouter.patch("/api/users/:id",authMiddleware, userController.update)


// Route for registering a new product
productRouter.post("/api/products", authMiddleware, productController.register); 

// Route for getting details of a specific product by ID
productRouter.get("/api/products/:id", authMiddleware, productController.get); 

// Route for update details of a specific product by ID
productRouter.patch("/api/products/:id", authMiddleware, productController.update); 

// Route for delete a specific product by ID
productRouter.delete("/api/products/:id", authMiddleware, productController.remove); 


// Route for create a new order
orderRouter.post("/api/order/", authMiddleware, orderController.createOrder);
// Route for getting a order
orderRouter.get("/api/order/:id", authMiddleware, orderController.getOrder);
// Route for getting all order
orderRouter.get("/api/order/",authMiddleware, orderController.listOrders);
// Route for create a new order
orderRouter.patch("/api/order/:id", authMiddleware, orderController.updateOrder);
// Route for create a new order
orderRouter.delete("/api/order/:id", authMiddleware, orderController.removeOrder);

export {
    userRouter,
    productRouter,
    orderRouter
}

