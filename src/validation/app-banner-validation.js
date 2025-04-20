import Joi from "joi";

const validateAddAppBanner = Joi.object({
    link: Joi.string().optional().allow('').empty(null),
    image_url: Joi.string().required(),
});



const validateUpdateAppBanner = Joi.object({
    link: Joi.string().optional(),
    image_url: Joi.string().optional(),
});

export {
    validateAddAppBanner,
    validateUpdateAppBanner
};
