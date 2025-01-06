import { validate } from "uuid";
import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.get(id);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// Update user function
const update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.update(id, req.body);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

// Delete user function
const remove = async (req, res, next) => {
  try {
    const id = req.user.id;
    const result = await userService.remove(id);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};
// Verify OTP function
const verifyOTP = async (req, res, next) => {
  const otp = req.body.otp;
  const userId = req.user.id;

  try {
    const result = await userService.verifyOTP(userId, otp);
    res.status(200).json({
      message: result.message,
    });
  } catch (e) {
    next(e);
  }
};

// Verify OTP function
const requestOTP = async (req, res, next) => {
    const userId = req.user.id;
    const email = req.user.email;  
  try {
    // Memanggil fungsi requestOTP dari userService
    const result = await userService.requestOTP(userId, email);
    // Mengirimkan response jika berhasil
    res.status(200).json({
      message: result.message, // Pesan sukses dari hasil generateOTP
    });
  } catch (e) {
    next(e);
  }
};

// Verify OTP function
const verifyForgotOTP = async (req, res, next) => {
  try {
    const result = await userService.verifyResetOTP(req.body);
    res.status(200).json({
      message: result.message,
    });
  } catch (e) {
    next(e);
  }
};

// Verify OTP function
const requestForgotOTP = async (req, res, next) => {

  try {
    // Memanggil fungsi requestOTP dari userService
    const result = await userService.requestResetOTP(req.body);
    // Mengirimkan response jika berhasil
    res.status(200).json({
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
  update,
  remove,
  verifyOTP,
  requestOTP,
  verifyForgotOTP,
  requestForgotOTP,
};
