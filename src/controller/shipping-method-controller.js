import shippingService from "../service/shipping-service.js";
import { validateGetShippingMethod } from "../validation/shipping-method-validation.js";
import { validate } from "../validation/validation.js";


const add = async (req, res, next) => {
  try {
    const result = await shippingService.addShippingMethod(req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};

const get = async (req, res, next) => {  
  let id = req.query.id;
  let result;
  try {
    const body = validate(validateGetShippingMethod,req.body)
    if(!id){      
      result = await shippingService.listShippingMethods(body,req.user);      
    }else{
      result = await shippingService.getShipingMethodById(id,body,req.user);
    }
     
    res.status(200).json({
        error: false,
        data: result,
      });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};


const update = async (req, res, next) => {
  try {
    const result = await shippingService.updateShippingMethod(req.body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    await shippingService.removeShippingMethods(req.body);
    res.status(200).json({
      error: false,
      data: "Shipping method delete successfuly",
    });
  } catch (e) {
    next(e);
  }
};


const listProvince = async (req, res, next) => {
  try {
    const result = await shippingService.listProvince();
    res.status(200).json({
        error: false,
        data: result,
      });
  } catch (e) {
    next(e); 
  }
};


const listCity = async (req, res, next) => {
  try {
    const result = await shippingService.listCity();
    res.status(200).json({
        error: false,
        data: result,
      });
  } catch (e) {
    next(e); 
  }
};



export default {
  add,
  get,
  listProvince,
  listCity,
  update,
  remove,
};
