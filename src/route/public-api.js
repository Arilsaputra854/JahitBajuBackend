import express from "express"
import userController from "../controller/user-controller.js"
import productController from "../controller/product-controller.js"; 
import shippingMethodController from "../controller/shipping-method-controller.js";
import packagingController from "../controller/packaging-controller.js";
import favoriteController from "../controller/favorite-controller.js";
import xenditController from "../controller/xendit-controller.js";
import termConditionController from "../controller/term-condition-controller.js";
import sizeGuideController from "../controller/size-guide-controller.js";


const publicRouter = express.Router()

publicRouter.post('/webhook/payment', xenditController.createOrder)

publicRouter.post("/api/users/register", userController.register)
publicRouter.post("/api/users/login", userController.login)

// Route for getting all Product
publicRouter.get("/api/products", productController.list);


// Route for getting all Shipping
publicRouter.get("/api/shippings", shippingMethodController.list);


// Route for getting all Packaging
publicRouter.get("/api/packagings", packagingController.list);

// Route for getting all Favorite
publicRouter.get("/api/favorites", favoriteController.getAllFavorites);


// Route for getting term & condition also privacy policy
publicRouter.get("/api/term-condition", termConditionController.get);


// Route for getting Panduan ukur baju
publicRouter.get("/api/size-guide", sizeGuideController.get);

export {
    publicRouter
}