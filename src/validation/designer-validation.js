import Joi from "joi";

const registerDesignerValidation = Joi.object({
    name: Joi.string().max(100).required(),
    description: Joi.string().required(),
});

const getDesignerValidation = Joi.string().max(100).required();

const updateDesignerValidation = Joi.object({
    name: Joi.string().max(100).optional(),
    description: Joi.string().optional(),
});

export {
    registerDesignerValidation,
    getDesignerValidation,
    updateDesignerValidation
};
