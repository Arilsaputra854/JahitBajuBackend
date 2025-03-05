import Joi from "joi";

const validateOrder = Joi.object({
    shipping_id: Joi.string().max(100).required(),
    packaging_id: Joi.string().max(100).required(),
    product_id: Joi.string().max(100).optional(),
    look_id: Joi.string().max(100).optional(),
    cart_id: Joi.string().max(100).optional(),
    quantity: Joi.number().integer().min(1).optional(),
    total_price: Joi.number().positive(),
    packaging_price: Joi.number().positive().required(),
    shipping_price: Joi.number().positive().required(),
    custom_price: Joi.number().optional(),
    rtw_price: Joi.number().optional(),
    discount: Joi.number().optional(),
    size: Joi.string().max(10).optional(),
    order_status: Joi.string().max(100).required(),
    resi: Joi.string().max(100).optional(),
    description: Joi.string().optional(),
    custom_design : Joi.string().optional()
})


export {
    validateOrder
};
