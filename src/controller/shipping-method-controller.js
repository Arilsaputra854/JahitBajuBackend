import shippingService from "../service/shipping-service.js";

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
  const { id } = req.query;
  var result;
  try {

    if (id) {
      result = await shippingService.getShipingMethod(id);
    } else {
      result = await shippingService.listShippingMethods();
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

export default {
  add,
  get,
  update,
  remove,
};
