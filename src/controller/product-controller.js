import productService from "../service/product-service.js";
import { validate } from "../validation/validation.js";
const register = async (req, res, next) => {
  try {
    // Call the register function from the productService and pass the request body
    const result = await productService.register(req.body);
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
      result = await productService.get(id);
    } else {
      result = await productService.list();
    }
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};


const getLatest = async (req, res, next) => {
  try {
    
    const result = await productService.getByLastUpdate();
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
  try {
    const { id } = req.params;
    const result = await productService.update(id, req.body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.remove(id);
    res.status(200).json({
      error: false,
      data: "Product delete successfuly",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  get,
  getLatest,
  update,
  remove,
};
