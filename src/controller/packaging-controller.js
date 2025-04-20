import packagingService from "../service/packaging-service.js";

const add = async (req, res, next) => {
  try {
    const result = await packagingService.addPackaging(req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e); // Pass the error to the error-handling middleware
  }
};

const get = async (req, res, next) => {
  const {id} = req.query;
  var result;
  try {
    if (id) {
      result = await packagingService.getPackaging(id);
    } else {
      result = await packagingService.listPackagings();
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
  const id = req.query.id;
  try {
    const result = await packagingService.updatePackaging(id,req.body);
    res.status(200).json({ error: false, data: result });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {

  try {

    const id= req.query.id;
    console.log(id);
    await packagingService.removePackaging(id);
    res.status(200).json({
      error: false,
      message: "Packaging delete successfuly",
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
