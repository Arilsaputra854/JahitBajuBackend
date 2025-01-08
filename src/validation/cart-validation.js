import Joi from "joi";

const validateCart = (data) => {
    const schema = Joi.object({
        buyerId: Joi.string().max(100).required(),
        totalPrice: Joi.number().positive().optional(),
        items: Joi.array().items(Joi.object({
            productId: Joi.string().max(100).required(),
            quantity: Joi.number().integer().min(1).required(),
            price: Joi.number().positive().required(),
            size: Joi.string().max(10).required(),
        })).required()
    });
    return schema.validate(data);
};

const validateCartItem = (data) => {
    const schema = Joi.object({
        productId: Joi.string().max(100).required(),
        quantity: Joi.number().integer().min(1).required(),
        price: Joi.number().positive().required(),
        size: Joi.string().max(10).required(),
        custom_design : Joi.optional()
    });
    return schema.validate(data);
};

export {
    validateCart,
    validateCartItem
};
