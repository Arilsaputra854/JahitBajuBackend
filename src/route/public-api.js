import express from "express"
import userController from "../controller/user-controller.js"
import productController from "../controller/product-controller.js"; 
import shippingMethodController from "../controller/shipping-method-controller.js";
import packagingController from "../controller/packaging-controller.js";
import favoriteController from "../controller/favorite-controller.js";
import xenditController from "../controller/xendit-controller.js";
import termConditionController from "../controller/term-condition-controller.js";
import sizeGuideController from "../controller/size-guide-controller.js";
import appBannerController from "../controller/app-banner-controller.js";
import customDesignUploadController from "../controller/upload-file-controller.js";
import productTermsController from "../controller/product-terms-controller.js";
import careGuideController from "../controller/care-guide-controller.js";
import designerController from "../controller/designer-controller.js";
import lookController from "../controller/look-controller.js";
import textureController from "../controller/texture-controller.js";
import appFeatureController from "../controller/app-feature-controller.js";
import adminController from "../controller/admin-controller.js";
import uploadFileController from "../controller/upload-file-controller.js";


const publicRouter = express.Router()

publicRouter.post('/webhook/payment', xenditController.createOrder)

publicRouter.post("/api/users/register", userController.register)
publicRouter.post("/api/users/login", userController.login)

publicRouter.post("/api/admin/login", adminController.login)

// Route for verify forgot password otp
publicRouter.post("/api/users/verify-reset-otp",  userController.verifyResetOTP);
// Route for request forgot password otp
publicRouter.post("/api/users/request-reset-otp", userController.requestResetOTP);


// Route for getting all Product
publicRouter.get("/api/products", productController.get);

// Route for getting latest datetime
publicRouter.get("/api/products/latest", productController.getLatest);

// Route for getting all Packaging
publicRouter.get("/api/packaging", packagingController.get);

// Route for getting all Favorite
publicRouter.get("/api/favorites", favoriteController.getAllFavorites);


// Route for getting term & condition also privacy policy
publicRouter.get("/api/term-condition", termConditionController.get);


// Route for getting term & condition also privacy policy
publicRouter.get("/api/term-condition/html", termConditionController.getHtml);

// Route for getting product term
publicRouter.get("/api/product-terms", productTermsController.get);


// Route for getting Panduan ukur baju
publicRouter.get("/api/size-guide", sizeGuideController.get);


// Route for getting Panduan Perawatan
publicRouter.get("/api/care-guide", careGuideController.get);


// Route for get a app banner
publicRouter.get("/api/app-banner", appBannerController.get);

// Route for get custom design
publicRouter.get("/api/upload/:filename", uploadFileController.get);


// Route for get a designer
publicRouter.get("/api/designer/", designerController.get);


// Route for get a looks
publicRouter.get("/api/designer/look", lookController.get);


// Route for get a texture
publicRouter.get("/api/designer/look/texture", textureController.get);

// Route for get a app features
publicRouter.get("/api/app-feature/", appFeatureController.getFeature);


// Route for get a list of province
publicRouter.get("/api/shipping/provinces", shippingMethodController.listProvince);


// Route for get a list of city
publicRouter.get("/api/shipping/cities", shippingMethodController.listCity);


export {
    publicRouter
}