import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import productController from "../controller/product-controller.js";
import orderController from "../controller/order-product-controller.js";
import cartController from "../controller/cart-controller.js";
import packagingController from "../controller/packaging-controller.js";
import shippingMethodController from "../controller/shipping-method-controller.js";
import favoriteController from "../controller/favorite-controller.js";
import termConditionController from "../controller/term-condition-controller.js";
import sizeGuideController from "../controller/size-guide-controller.js";
import appBannerController from "../controller/app-banner-controller.js";
import customDesignController from "../controller/custom-design-controller.js";
import productTermsController from "../controller/product-terms-controller.js";
import careGuideController from "../controller/care-guide-controller.js";
import productNoteController from "../controller/product-note-controller.js";
import designerController from "../controller/designer-controller.js";
import lookController from "../controller/look-controller.js";
import textureController from "../controller/texture-controller.js";
import appFeatureController from "../controller/app-feature-controller.js";
import orderLookController from "../controller/order-look-controller.js";
import lookAccessController from "../controller/look-access-controller.js";
import { adminAuthMiddleware } from "../middleware/admin-auth-middleware.js";

const userRouter = express.Router();
const productRouter = express.Router();
const orderRouter = express.Router();
const cartRouter = express.Router();
const shippingRouter = express.Router();
const packagingRouter = express.Router();
const favoriteRoute = express.Router();
const termConditionRoute = express.Router();
const sizeGuideRoute = express.Router();
const careGuideRoute = express.Router();
const appBannerRouter = express.Router();
const customDesignRouter = express.Router();
const productTermsRouter = express.Router();
const lookTextureRouter = express.Router();
const productNoteRouter = express.Router();
const designerRouter = express.Router();
const lookRouter = express.Router();
const lookOrderRouter = express.Router();
const appFeatureRouter = express.Router();
const lookAccessRouter = express.Router();

//route for get current user
userRouter.get("/api/users/current", authMiddleware, userController.get);


//route for get user
userRouter.get("/api/users/:id", authMiddleware, userController.getById);

// Route for verify a new user
userRouter.post("/api/users/current/verify-email",authMiddleware,  userController.verifyOTP);
// Route for request new otp
userRouter.post("/api/users/current/request-otp",authMiddleware, userController.requestOTP);


userRouter.post("/api/users/activate/:id",adminAuthMiddleware, userController.activate);

// Route for verify a new user
userRouter.post("/api/remove-account",authMiddleware,  userController.requestRemoveAccount);

// Route for delete user
userRouter.delete("/api/users/:id", adminAuthMiddleware, userController.remove);

// Route for delete user
userRouter.get("/api/users/", adminAuthMiddleware, userController.list);

// Route for update user
userRouter.patch("/api/users/:id", authMiddleware, userController.update);

// Route for registering a new product
productRouter.post("/api/products", adminAuthMiddleware, productController.register);


// Route for registering a new product
productRouter.get("/api/all-products/", adminAuthMiddleware, productController.getAll);

// Route for update details of a specific product by ID
productRouter.patch("/api/products/:id", adminAuthMiddleware, productController.update);

// Route for delete a specific product by ID
productRouter.delete("/api/products/:id", adminAuthMiddleware, productController.remove);



// Route for getting a product note
productNoteRouter.get("/api/product-note", authMiddleware, productNoteController.get);

// Route for registering a new product note
productNoteRouter.post("/api/product-note", adminAuthMiddleware, productNoteController.add);

// Route for update product note
productNoteRouter.patch("/api/product-notes", adminAuthMiddleware, productNoteController.update);



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
shippingRouter.post("/api/shipping/", adminAuthMiddleware, shippingMethodController.add);

// Route for get a shipping
shippingRouter.get("/api/shipping/", authMiddleware, shippingMethodController.get);

// Route for get all Shipping method
shippingRouter.post("/api/shippings/", authMiddleware,shippingMethodController.get);

// Route for updating a shipping
shippingRouter.patch("/api/shipping/", adminAuthMiddleware, shippingMethodController.update);

// Route for deleting a shipping
shippingRouter.delete("/api/shipping/", adminAuthMiddleware, shippingMethodController.remove);


// Route for post a packaging
packagingRouter.post("/api/packaging/", adminAuthMiddleware, packagingController.add);

// Route for updating a packaging
packagingRouter.patch("/api/packaging/", adminAuthMiddleware, packagingController.update);

// Route for deleting a packaging
packagingRouter.delete("/api/packaging/", adminAuthMiddleware, packagingController.remove);

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
termConditionRoute.post("/api/term-condition/", adminAuthMiddleware, termConditionController.add);
// Route for update a term condition
termConditionRoute.patch("/api/term-condition/", adminAuthMiddleware, termConditionController.update);



// Route for add a product term
productTermsRouter.post("/api/product-terms/", adminAuthMiddleware, productTermsController.add);
// Route for update a product term
productTermsRouter.patch("/api/product-terms/", adminAuthMiddleware, productTermsController.update);


// Route for add a size guide
sizeGuideRoute.post("/api/size-guide/", adminAuthMiddleware, sizeGuideController.add);
// Route for update a size guide
sizeGuideRoute.patch("/api/size-guide/", adminAuthMiddleware, sizeGuideController.update);



// Route for add a care guide
sizeGuideRoute.post("/api/care-guide", adminAuthMiddleware, careGuideController.add);
// Route for update a care guide
sizeGuideRoute.patch("/api/care-guide/", adminAuthMiddleware, careGuideController.update);


// Route for add a app banner
appBannerRouter.post("/api/app-banner/", adminAuthMiddleware, appBannerController.add);
// Route for update a app banner
appBannerRouter.patch("/api/app-banner/", adminAuthMiddleware, appBannerController.update);
// Route for delete a app banner
appBannerRouter.delete("/api/app-banner/", adminAuthMiddleware, appBannerController.remove);


// Route for add a designer
designerRouter.post("/api/designer", adminAuthMiddleware, designerController.register);

// Route for update a designer
designerRouter.patch("/api/designer", adminAuthMiddleware, designerController.update);

// Route for update a designer
designerRouter.delete("/api/designer", adminAuthMiddleware, designerController.remove);

// Route for add a custom design
customDesignRouter.post("/api/order/custom-design/", adminAuthMiddleware, customDesignController.add);


// Route for add a designer
lookRouter.post("/api/designer/look", adminAuthMiddleware, lookController.register);

// Route for update a designer
lookRouter.patch("/api/designer/look", adminAuthMiddleware, lookController.update);

// Route for delete a designer
lookRouter.delete("/api/designer/look", adminAuthMiddleware, lookController.remove);


// Route for add a texture for look
lookTextureRouter.post("/api/designer/look/texture", adminAuthMiddleware, textureController.register);

// Route for update a texture for look
lookTextureRouter.patch("/api/designer/look/texture", adminAuthMiddleware, textureController.update);


// Route for add feature 
appFeatureRouter.post("/api/app-feature", adminAuthMiddleware, appFeatureController.createFeature);

// Route for update feature 
appFeatureRouter.patch("/api/app-feature", adminAuthMiddleware, appFeatureController.updateFeature);

// Route for buy feature 
appFeatureRouter.post("/api/app-feature/buy", adminAuthMiddleware, appFeatureController.buyFeature);

// Route for get buy feature 
appFeatureRouter.get("/api/app-feature/buy/:id", adminAuthMiddleware, appFeatureController.getOrderFeature);


// Route for buy look
lookOrderRouter.post("/api/look/buy/", authMiddleware, orderLookController.createLookOrder);
// Route for buy look
lookOrderRouter.get("/api/look/buy/:id", authMiddleware, orderLookController.getLookOrder);

// Route for get look access
lookAccessRouter.get("/api/look/:look_id", authMiddleware, lookAccessController.get);


export {
    userRouter,
    productRouter,
    orderRouter,
    cartRouter,
    shippingRouter,
    packagingRouter,
    favoriteRoute,
    sizeGuideRoute,
    careGuideRoute,
    termConditionRoute,
    appBannerRouter,
    customDesignRouter,
    productTermsRouter,
    lookTextureRouter,
    productNoteRouter,
    designerRouter,
    lookRouter,
    appFeatureRouter,
    lookOrderRouter,
    lookAccessRouter
};
