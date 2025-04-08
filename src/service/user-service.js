import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import nodemailer from "nodemailer";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { generateAndSendOTP, validateOTP } from "./otp-service.js";
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
      delete_at : null
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
      user_id: userId,
      type: "EMAIL_VERIFICATION",
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
      user_id: user.id,
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


const getById = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    include: {
      address: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

const get = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prismaClient.user.findUnique({
    where: {
      id: id,
    },
    include: {
      address: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};



const list = async (id) => {

  const user = await prismaClient.user.findMany({
    include: {
      address: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is empty");
  }

  return user;
};

// Update user function
const update = async (id, request) => {
  const userData = validate(updateUserValidation, request);

  const userExists = await prismaClient.user.findUnique({
    where: { id: id },
    include: { address: true }, // Ambil data alamat juga
  });

  if (!userExists) {
    throw new ResponseError(404, "User not found");
  }

  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  let addressUpdate = {};

  if (request.address) {
    addressUpdate = {
      address: {
        upsert: {
          create: {
            street_address: request.address.street_address,
            city: request.address.city,
            province: request.address.province,
            postal_code: request.address.postal_code,
            district : request.address.district,
            village : request.address.village
          },
          update: {
            street_address: request.address.street_address,
            city: request.address.city,
            province: request.address.province,
            postal_code: request.address.postal_code,
            district : request.address.district,
            village : request.address.village,
            updated_at: new Date(),
          },
        },
      },
    };
  }

  // Gunakan transaksi Prisma agar update user & alamat dilakukan bersama
  return prismaClient.user.update({
    where: { id: id },
    data: {
      last_update: new Date(),
      ...userData,
      ...addressUpdate, // Update alamat jika ada
    },
    include: { address: true },
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

  // Hapus akun user
  return prismaClient.user.update({
    where: { id: id },data : {
      delete_at : new Date()
    }
  });

};

const requestRemoveAccount = async (id) => {
  id = validate(getUserValidation, id);

  const user = await prismaClient.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  await sendEmailMessage(
    user.email,
    "Permintaan Penghapusan Akun",
    `Halo ${user.name},\n\nKami telah menerima permintaan Anda untuk menghapus akun di Jahit Baju.\n\nJika Anda benar-benar ingin menghapus akun ini, harap balas email ini untuk mengonfirmasi. Setelah dikonfirmasi, akun Anda beserta semua data terkait akan dihapus secara permanen.\n\nJika Anda tidak merasa mengajukan permintaan ini, silakan abaikan email ini. Akun Anda akan tetap aktif seperti biasa.\n\nSalam,\nJahit Baju Official`
  );

  return "Permintaan penghapusan akun berhasil diterima, Silakan cek email anda.";
};


const activate = async (id) => {

  const user = await prismaClient.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  if(user.delete_at == null){
    throw new ResponseError(404, "User already active.");
  }

  console.log(id)

  // Hapus akun user
  return prismaClient.user.update({
    where: { id: id },data : {
      delete_at : null
    }
  });
};

// Email Sender Configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // host Email on ENV
  port: process.env.EMAIL_PORT, // port Email on ENV
  secure: false,
  auth: {
    user: process.env.EMAIL_USER, // sender Email on ENV
    pass: process.env.EMAIL_PASS, // sender Password on ENV
  },
});



// sent Message to email
const sendEmailMessage = async (email, subject, message) => {
  var mailOptions = {
    from: `"Jahit Baju Official" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    text: message,
  };

  return transporter.sendMail(mailOptions);
};

export default {
  register,
  login,
  list,
  get,
  activate,
  getById,
  update,
  remove,
  requestRemoveAccount,
  verifyOTP,
  requestOTP,
  verifyResetOTP,
  requestResetOTP,
};
