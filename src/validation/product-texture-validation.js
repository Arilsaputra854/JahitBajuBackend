import Joi from "joi";

const createTextureValidation = Joi.object({
    product_id: Joi.string().max(100).required(),
    title: Joi.string().max(100).required(),
    url_texture: Joi.string().uri().optional(), // Pastikan format URL valid
    hex: Joi.string().pattern(/^#([0-9A-Fa-f]{6})$/).optional(), // Validasi hex warna
    description: Joi.string().max(1000).optional(),
});

const updateTextureValidation = Joi.object({
    title: Joi.string().max(100).optional(),
    url_texture: Joi.string().uri().optional(),
    hex: Joi.string().pattern(/^#([0-9A-Fa-f]{6})$/).optional(),
    description: Joi.string().max(1000).optional(),
});


export {
    createTextureValidation,
    updateTextureValidation
};
