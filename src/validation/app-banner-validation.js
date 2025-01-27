import Joi from "joi";

const validateAddAppBanner = Joi.object({
    link: Joi.string().required(),
    image_url: Joi.string().required(),
});


const validateDeleteAppBanner = Joi.object({
    id: Joi.string().max(100).required()
});


const validateUpdateAppBanner = Joi.object({
    id: Joi.string().max(100).required(),
    link: Joi.string().optional(),
    image_url: Joi.string().optional(),
});

export {
    validateAddAppBanner,
    validateDeleteAppBanner,
    validateUpdateAppBanner
};
