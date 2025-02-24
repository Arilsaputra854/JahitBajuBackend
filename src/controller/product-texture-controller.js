import { ResponseError } from "../error/response-error.js";
import productService from "../service/product-service.js";
import productTextureService from "../service/product-texture-service.js";
import { createTextureValidation, updateTextureValidation } from "../validation/product-texture-validation.js";
import { validate } from "../validation/validation.js";
const register = async (req, res, next) => {
  try {

  const body = validate(createTextureValidation, req.body)
    // Call the register function from the productService and pass the request body
    const result = await productTextureService.add(body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};

const get = async (req, res, next) => {
  
  try {
    const { id } = req.query;
    var result;
    if (id) {
      result = await productTextureService.get(id);
    } else {
      result = await productTextureService.list();
    }
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};


// Update function
const update = async (req, res, next) => {

  const body = validate(updateTextureValidation, req.body)
  try {
    const { id } = req.params;
    const result = await productTextureService.update(id, body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!id) throw new ResponseError(400, "product texture id is required.")
    await productService.remove(id);
    res.status(200).json({
      error: false,
      data: "product texture delete successfuly",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  update,
  remove,
};
