import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter, userRouter, orderRouter, cartRouter, shippingRouter, packagingRouter, favoriteRoute, termConditionRoute, sizeGuideRoute, appBannerRouter, surveiRouter, customDesignRouter, productTermsRouter, careGuideRoute, productNoteRouter, designerRouter, lookRouter, lookTextureRouter, customizationAccessRouter, featureRouter } from "../route/api.js";

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
web.use(surveiRouter)
web.use(customDesignRouter)
web.use(productTermsRouter)
web.use(lookTextureRouter)
web.use(productNoteRouter)
web.use(designerRouter)
web.use(lookRouter)
web.use(customizationAccessRouter)
web.use(featureRouter)
web.use(errorMiddleware)


web.get('/', (req, res) => {
    res.json({
      message: "Selamat datang di API Jahit Baju Apps v1!",
      success: true,
    });
  });
