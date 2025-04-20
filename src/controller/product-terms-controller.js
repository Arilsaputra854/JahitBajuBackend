import productTermsService from "../service/product-terms-service.js";

const add = async (req, res, next) => {
    const body = req.body;
    const size = body.size;
    const color = body.color;
    const texture = body.texture;
    

  try {
    const result = await productTermsService.addProductTerms(size,color, texture);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await productTermsService.getProductTerms(req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await productTermsService.updateProductTerms(req.body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

export default {
  add,
  get,
  update,
};
