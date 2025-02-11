import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";
import orderController from "../controller/order-controller.js";
import cartController from "../controller/cart-controller.js";
import packagingController from "../controller/packaging-controller.js";
import shippingMethodController from "../controller/shipping-method-controller.js";
import favoriteController from "../controller/favorite-controller.js";
import termConditionController from "../controller/term-condition-controller.js";
import sizeGuideController from "../controller/size-guide-controller.js";
import surveiController from "../controller/survei-controller.js";
import appBannerController from "../controller/app-banner-controller.js";
import customDesignController from "../controller/custom-design-controller.js";
import productTermsController from "../controller/product-terms-controller.js";

const userRouter = express.Router();
const productRouter = express.Router();
const orderRouter = express.Router();
const cartRouter = express.Router();
const shippingRouter = express.Router();
const packagingRouter = express.Router();
const favoriteRoute = express.Router();
const termConditionRoute = express.Router();
const sizeGuideRoute = express.Router();
const surveiRouter = express.Router();
const appBannerRouter = express.Router();
const customDesignRouter = express.Router();
const productTermsRouter = express.Router();

// Route for registering a new user
userRouter.get("/api/users/current", authMiddleware, userController.get);

// Route for verify a new user
userRouter.post("/api/users/current/verify-email",authMiddleware,  userController.verifyOTP);
// Route for request new otp
userRouter.post("/api/users/current/request-otp",authMiddleware, userController.requestOTP);

// Route for delete user
userRouter.delete("/api/users/:id", authMiddleware, userController.remove);

// Route for update user
userRouter.patch("/api/users/:id", authMiddleware, userController.update);

// Route for registering a new product
productRouter.post("/api/products", authMiddleware, productController.register);

// Route for update details of a specific product by ID
productRouter.patch("/api/products/:id", authMiddleware, productController.update);

// Route for delete a specific product by ID
productRouter.delete("/api/products/:id", authMiddleware, productController.remove);


// Route for create a new order
orderRouter.post("/api/order/", authMiddleware, orderController.createOrder);

// Route for getting a order
orderRouter.get("/api/order/", authMiddleware, orderController.getOrder);

// Route for getting all order
orderRouter.get("/api/orders/", orderController.listOrders);

// Route for update an order
orderRouter.patch("/api/order/:id", authMiddleware, orderController.updateOrder);

// Route for delete an order
orderRouter.delete("/api/order/:id", authMiddleware, orderController.removeOrder);

// Route for delete an order item
orderRouter.delete("/api/order/:orderId/item/:itemId", authMiddleware, orderController.removeOrderItem);

// Route for getting and creating a cart
cartRouter.get("/api/cart/", authMiddleware, cartController.getCart);

// Route for getting all carts
cartRouter.get("/api/carts/", cartController.listCarts);


// Route for updating a cart
cartRouter.post("/api/cart/", authMiddleware, cartController.addToCart);

// Route for updating a cart
cartRouter.patch("/api/cart/", authMiddleware, cartController.updateCart);

// Route for deleting a cart
cartRouter.delete("/api/cart/", authMiddleware, cartController.removeCart);

// Route for deleting a cart item
cartRouter.delete("/api/cart/item/:itemId", authMiddleware, cartController.removeCartItem);



// Route for updating a shipping
shippingRouter.post("/api/shipping/", authMiddleware, shippingMethodController.add);

// Route for updating a shipping
shippingRouter.patch("/api/shipping/", authMiddleware, shippingMethodController.update);

// Route for deleting a shipping
shippingRouter.delete("/api/shipping/", authMiddleware, shippingMethodController.remove);


// Route for post a packaging
packagingRouter.post("/api/packaging/", authMiddleware, packagingController.add);

// Route for updating a packaging
packagingRouter.patch("/api/packaging/", authMiddleware, packagingController.update);

// Route for deleting a packaging
packagingRouter.delete("/api/packaging/", authMiddleware, packagingController.remove);

// Route for get a packaging
packagingRouter.get("/api/packaging/", authMiddleware, packagingController.get);




// Route for post a packaging
favoriteRoute.post("/api/favorite/", authMiddleware, favoriteController.addFavorite);

// Route for deleting a packaging
favoriteRoute.delete("/api/favorite/", authMiddleware, favoriteController.removeFavorite);

// Route for get a packaging
favoriteRoute.get("/api/favorite/", authMiddleware, favoriteController.getFavorite);

// Route for get a packaging
favoriteRoute.get("/api/favorite/count", authMiddleware, favoriteController.getProductFavoriteCount);

// Route for get a packaging
favoriteRoute.get("/api/favorites/", authMiddleware, favoriteController.getAllFavorites);



// Route for add a term condition
termConditionRoute.post("/api/term-condition/", authMiddleware, termConditionController.add);
// Route for update a term condition
termConditionRoute.patch("/api/term-condition/", authMiddleware, termConditionController.update);



// Route for add a product term
productTermsRouter.post("/api/product-terms/", authMiddleware, productTermsController.add);
// Route for update a product term
productTermsRouter.patch("/api/product-terms/", authMiddleware, productTermsController.update);


// Route for add a size guide
sizeGuideRoute.post("/api/size-guide/", authMiddleware, sizeGuideController.add);
// Route for update a size guide
sizeGuideRoute.patch("/api/size-guide/", authMiddleware, sizeGuideController.update);


// Route for add a app banner
appBannerRouter.post("/api/app-banner/", authMiddleware, appBannerController.add);
// Route for update a app banner
appBannerRouter.patch("/api/app-banner/", authMiddleware, appBannerController.update);
// Route for delete a app banner
appBannerRouter.delete("/api/app-banner/", authMiddleware, appBannerController.remove);


// Route for add a survei
surveiRouter.post("/api/survei-custom/", authMiddleware, surveiController.add);

// Route for get a specific survei
surveiRouter.get("/api/survei-custom/", authMiddleware, surveiController.get);


// Route for add a custom design
customDesignRouter.post("/api/order/custom-design/", authMiddleware, customDesignController.add);


export {
    userRouter,
    productRouter,
    orderRouter,
    cartRouter,
    shippingRouter,
    packagingRouter,
    favoriteRoute,
    sizeGuideRoute,
    termConditionRoute,
    appBannerRouter,
    surveiRouter,
    customDesignRouter,
    productTermsRouter
};
