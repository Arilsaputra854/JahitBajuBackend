import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter, userRouter, orderRouter, cartRouter, shippingRouter, packagingRouter, favoriteRoute, termConditionRoute, sizeGuideRoute } from "../route/api.js";

export const web = express();
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
web.use(errorMiddleware)


