import Joi from "joi";

const validateOrder = (data) => {
    const schema = Joi.object({
        buyerId: Joi.string().max(100).required(),
        orderDate: Joi.string().max(100).required(),
        totalPrice: Joi.number().positive(),
        items: Joi.array().items(Joi.object({
            productId: Joi.string().max(100).required(),
            quantity: Joi.number().integer().min(1).required(),
            priceAtPurchase: Joi.number().positive().required(),
        })).required()
    });
    return schema.validate(data);
};

const validateOrderItem = (data) => {
    const schema = Joi.object({
        productId: Joi.string().max(100).required(),
        quantity: Joi.number().integer().min(1),
        priceAtPurchase: Joi.number().positive(),
        status: Joi.string().max(100),
    });
    return schema.validate(data);
};

export {
    validateOrder,
    validateOrderItem
};
