import Joi from "joi";

const validateFavorite = Joi.object({
    product_id: Joi.string().max(100).required()
});

const validateIdFavorite = Joi.object({
    id: Joi.number().required()
});


const validateProductIdFavorite = Joi.object({
    product_id: Joi.string().max(100).required()
});


export {
    validateFavorite,
    validateIdFavorite,
    validateProductIdFavorite
};
