import Joi from "joi";

const createCustomizationAccessValidation = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().precision(2).min(0).required(),
});

const updateCustomizationAccessValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().precision(2).min(0).optional(),
});

export {
  createCustomizationAccessValidation,
  updateCustomizationAccessValidation,
};
