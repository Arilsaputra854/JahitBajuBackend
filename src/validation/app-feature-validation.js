import Joi from "joi";

const createFeatureValidation = Joi.object({
  name: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().precision(2).min(0).required(),
});


const updateFeatureValidation = Joi.object({
  name: Joi.string().max(100).optional(),
  type: Joi.string().max(100).optional(),
  description: Joi.string().max(1000).optional(),
  price: Joi.number().precision(2).min(0).optional(),
});


export {
  createFeatureValidation,
  updateFeatureValidation
};
