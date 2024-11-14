import express from "express"
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { productRouter, userRouter } from "../route/api.js";
import productController from "../controller/product-controller.js";

export const web = express();
web.use(express.json());
web.use(userRouter)
web.use(productRouter)
web.use(publicRouter)
web.use(errorMiddleware)
