import Joi from "joi";

const validateOrder = Joi.object({
    shipping_id: Joi.string().max(100).required(),
    packaging_id: Joi.string().max(100).required(),
    product_id: Joi.string().max(100).optional(),
    cart_id: Joi.string().max(100).optional(),
    quantity: Joi.number().integer().min(1).optional(),
    total_price: Joi.number().positive(),
    size: Joi.string().max(10).optional(),
    order_status: Joi.string().max(100).required(),
});


export {
    validateOrder
};
