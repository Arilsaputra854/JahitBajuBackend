import Joi from "joi";

const registerProductValidation = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().max(1000).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    sold: Joi.number().integer().min(0).optional(),
    seen: Joi.number().integer().min(0).optional(),
    favorite: Joi.number().integer().min(0).optional(),
    type: Joi.number().integer().min(0).required(),
    images_url: Joi.array().items(Joi.string().uri()).required(), // Update for array of URLs
    tags: Joi.array().items(Joi.string().max(50)).required(),
    category: Joi.array().items(Joi.string().max(50)).required(),
    size: Joi.array().items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL", "ALL SIZE")).required(),
    colors: Joi.array().optional(),
    materials: Joi.array().items(Joi.string()).optional(),
});

const getProductValidation = Joi.string().max(100).required();

const updateProductValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    description: Joi.string().max(1000).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    sold: Joi.number().integer().min(0).optional(),
    seen: Joi.number().integer().min(0).optional(),
    favorite: Joi.number().integer().min(0).optional(),
    type: Joi.number().integer().min(0).optional(),
    images_url: Joi.array().items(Joi.string().uri()).optional(),
    tags: Joi.array().items(Joi.string().max(50)).optional(),
    category: Joi.array().items(Joi.string().max(50)).optional(),
    size: Joi.array().items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL", "ALL SIZE")).optional(),
    colors: Joi.array().items(Joi.string()).optional(),
    materials: Joi.array().items(Joi.string()).optional(),
});


export {
    registerProductValidation,
    getProductValidation,
    updateProductValidation
};
