import adminService from "../service/admin-service.js";


//handle login request
const login = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);
    res.status(200).json({
      error : false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};


export default {
  login,
};
