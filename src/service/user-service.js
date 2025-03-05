import { response } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { generateAndSendOTP, validateOTP } from "../service/otp-service.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import {
  validateRequestForgotOtp,
  validateForgotOtp,
} from "../validation/request-forgot-otp.js";

const register = async (request) => {
  var user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
  });
};

const login = async (request) => {
  var loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
  });

  if (!user) {
    throw new ResponseError(401, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password is invalid");
  }

  const token = uuid().toString();
  await prismaClient.user.update({
    data: {
      token: token,
      last_update: new Date(),
    },
    where: {
      email: user.email,
    },
  });

  return {
    token,
  };
};

const verifyOTP = async (userId, otp) => {
  try {
    return await validateOTP(userId, otp, "EMAIL_VERIFICATION");
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

const requestOTP = async (userId, email) => {
  // Cek apakah sudah ada OTP yang valid
  const existingOtp = await prismaClient.oTP.findFirst({
    where: {
      userId: userId,
      type: "EMAIL_VERIFICATION",
      expiresAt: {
        gte: new Date(), // Mengecek jika OTP masih berlaku
      },
    },
  });

  if (existingOtp) {
    // Jika OTP masih valid, kirimkan response error
    throw new ResponseError(
      400,
      "OTP is already valid and not expired. Please verify it."
    );
  }

  // Jika OTP tidak ada atau sudah kadaluarsa, buat dan kirimkan OTP baru
  return await generateAndSendOTP(userId, email, "EMAIL_VERIFICATION");
};

const requestResetOTP = async (body) => {
  const requestBody = validate(validateRequestForgotOtp, body);
  const email = requestBody.email;
  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(400, "User not found.");
  }

  // Cek apakah sudah ada OTP yang valid
  const existingOtp = await prismaClient.oTP.findFirst({
    where: {
      userId: user.id,
      type: "FORGOT_PASSWORD",
      expires_at: {
        gte: new Date(), // Mengecek jika OTP masih berlaku
      },
    },
  });

  if (existingOtp) {
    // Jika OTP masih valid, kirimkan response error
    throw new ResponseError(
      400,
      "OTP is already valid and not expired. Please verify it."
    );
  }

  // Jika OTP tidak ada atau sudah kadaluarsa, buat dan kirimkan OTP baru
  return await generateAndSendOTP(user.id, email, "FORGOT_PASSWORD");
};

const verifyResetOTP = async (body) => {
  const requestBody = validate(validateForgotOtp, body);
  const email = requestBody.email;
  const otp = requestBody.otp;
  console.log(email);
  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(400, "User not found.");
  }

  try {
    return await validateOTP(user.id, otp, "FORGOT_PASSWORD");
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

const get = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    }
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

// Update user function
const update = async (id, request) => {
  const userData = validate(updateUserValidation, request);

  const userExists = await prismaClient.user.findUnique({
    where: { id: id },
  });

  if (!userExists) {
    throw new ResponseError(404, "User not found");
  }

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  return prismaClient.user.update({
    where: { id: id },
    data: {
      last_update: new Date(),
      ...userData,
    },
  });
};

// Delete user function
const remove = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prismaClient.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  return prismaClient.user.delete({
    where: { id: id },
  });
};

export default {
  register,
  login,
  get,
  update,
  remove,
  verifyOTP,
  requestOTP,
  verifyResetOTP,
  requestResetOTP,
};
