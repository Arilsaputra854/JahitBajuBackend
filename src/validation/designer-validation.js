import Joi from "joi";

const registerDesignerValidation = Joi.object({
    name: Joi.string().max(100).required(),
});

const getDesignerValidation = Joi.string().max(100).required();

const updateDesignerValidation = Joi.object({
    name: Joi.string().max(100).optional(),
});

export {
    registerDesignerValidation,
    getDesignerValidation,
    updateDesignerValidation
};
