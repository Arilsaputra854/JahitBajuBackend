import { validate } from "uuid";
import userService from "../service/user-service.js";

//handle registration request
const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle login request
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle fetch specific user request
const get = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.get(id);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle fetch specific user request
const list = async (req, res, next) => {
  try {
    const result = await userService.list();
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle user update data request
const update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.update(id, req.body);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle remove user account request
const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.remove(id);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle remove user account request
const getById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await userService.getById(id);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle request remove user account
const requestRemoveAccount = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.requestRemoveAccount(id);
    res.status(200).json({
      error: false,
      message: result,
    });
  } catch (e) {
    next(e);
  }
};

//handle email verify OTP
const verifyOTP = async (req, res, next) => {
  const otp = req.body.otp;
  const userId = req.user.id;

  try {
    const result = await userService.verifyOTP(userId, otp);
    res.status(200).json({
      error: false,
      token: result.token,
    });
  } catch (e) {
    next(e);
  }
};

//handle request email verify OTP
const requestOTP = async (req, res, next) => {
  const userId = req.user.id;
  const email = req.user.email;
  try {
    // Memanggil fungsi requestOTP dari userService
    const result = await userService.requestOTP(userId, email);
    // Mengirimkan response jika berhasil
    res.status(200).json({
      error: false,
      message: result.message, // Pesan sukses dari hasil generateOTP
    });
  } catch (e) {
    next(e);
  }
};

//handle verify reset password OTP
const verifyResetOTP = async (req, res, next) => {
  try {
    const result = await userService.verifyResetOTP(req.body);
    res.status(200).json({
      error: false,
      token: result.token,
    });
  } catch (e) {
    next(e);
  }
};

//handle request reset password OTP
const requestResetOTP = async (req, res, next) => {
  try {
    // Memanggil fungsi requestOTP dari userService
    const result = await userService.requestResetOTP(req.body);
    // Mengirimkan response jika berhasil
    res.status(200).json({
      error: false,
      message: result.message, // Pesan sukses dari hasil generateOTP
    });
  } catch (e) {
    next(e);
  }
};

//handle request reset password OTP
const activate = async (req, res, next) => {
  try {
    const {id} = req.params;
    // Memanggil fungsi requestOTP dari userService
    const result = await userService.activate(id);
    // Mengirimkan response jika berhasil
    res.status(200).json({
      error: false,
      message: result.message, // Pesan sukses dari hasil generateOTP
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  activate,
  getById,
  list,
  update,
  remove,
  requestRemoveAccount,
  verifyOTP,
  requestOTP,
  verifyResetOTP,
  requestResetOTP,
};
