import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter, userRouter, orderRouter, cartRouter, shippingRouter, packagingRouter, favoriteRoute, termConditionRoute, sizeGuideRoute, appBannerRouter, customDesignRouter, productTermsRouter, careGuideRoute, productNoteRouter, designerRouter, lookRouter, lookTextureRouter,appFeatureRouter, lookOrderRouter, lookAccessRouter } from "../route/api.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json" assert { type: "json" }; // Pastikan path benar

export const web = express();
web.use(express.json({ limit: '20mb' }));
web.use(express.urlencoded({ limit: '20mb', extended: true }));

web.use(express.json());
web.use(userRouter)
web.use(productRouter)
web.use(orderRouter)
web.use(cartRouter)
web.use(publicRouter)
web.use(shippingRouter)
web.use(packagingRouter)
web.use(favoriteRoute)
web.use(termConditionRoute)
web.use(sizeGuideRoute)
web.use(careGuideRoute)
web.use(appBannerRouter)
web.use(customDesignRouter)
web.use(productTermsRouter)
web.use(lookTextureRouter)
web.use(productNoteRouter)
web.use(designerRouter)
web.use(lookRouter)
web.use(appFeatureRouter)
web.use(lookOrderRouter)
web.use(lookAccessRouter)
web.use(errorMiddleware)



web.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

web.get('/', (req, res) => {
    res.json({
      message: "Selamat datang di API Jahit Baju Apps v1!",
      success: true,
    });
  });
