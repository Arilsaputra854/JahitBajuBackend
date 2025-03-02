import Joi from "joi";

const registerLookValidation = Joi.object({
  designer_id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  design_url: Joi.string().required(),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  description: Joi.string().max(1000).required(),
  size: Joi.array()
    .items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL", "ALL SIZE"))
    .required(),
  sold: Joi.number().integer().min(0).optional(),
  seen: Joi.number().integer().min(0).optional(),
  look_price: Joi.number().integer().min(0).required(),
  price: Joi.number().integer().min(0).required(),
  textures: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().optional(),
        look_id: Joi.number().integer().optional(),
        texture_url: Joi.string().uri().required(),
      })
    )
    .optional(),
});
const updateLookValidation = Joi.object({
  designer_id: Joi.number().integer().optional(),
  name: Joi.string().max(100).optional(),
  design_url: Joi.string().required(),
  features: Joi.array().items(Joi.string().max(50)).optional(),
  description: Joi.string().max(1000).optional(),
  size: Joi.array()
    .items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL", "ALL SIZE"))
    .required(),
  sold: Joi.number().integer().min(0).optional(),
  seen: Joi.number().integer().min(0).optional(),
  look_price: Joi.number().integer().min(0).required(),
  price: Joi.number().integer().min(0).optional(),
  textures: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().integer().optional(),
        look_id: Joi.number().integer().optional(),
        texture_url: Joi.string().uri().optional(),
      })
    )
    .optional(),
});

export { registerLookValidation, updateLookValidation };
