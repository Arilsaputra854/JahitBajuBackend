import { prismaClient } from "../application/database.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { ResponseError } from "../error/response-error.js";

// Secret key untuk enkripsi/dekripsi (harus disimpan secara aman)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;  // Pastikan untuk menyimpan di env file, jangan hardcode!
const ALGORITHM = 'aes-256-cbc';  // Algoritma enkripsi

// Fungsi untuk membuat OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Fungsi untuk enkripsi OTP
const encryptOTP = (otp) => {
  if (!otp) {
    throw new Error('OTP is required for encryption');
  }

  const iv = crypto.randomBytes(16);  // IV (Initialization Vector) untuk enkripsi
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encryptedOTP = cipher.update(otp, 'utf8', 'base64');  // Menggunakan base64
  encryptedOTP += cipher.final('base64');
  return { iv: iv.toString('hex'), encryptedOTP };  // Mengembalikan hasil enkripsi dalam base64 dan IV
};

// Fungsi untuk dekripsi OTP
const decryptOTP = (encryptedOTP, iv) => {
  if (!encryptedOTP || !iv) {
    throw new Error('Encrypted OTP and IV are required for decryption');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decryptedOTP = decipher.update(encryptedOTP, 'base64', 'utf8');  // Menggunakan base64
  decryptedOTP += decipher.final('utf8');
  return decryptedOTP;
};

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true untuk 465, false untuk lainnya
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Kirim OTP ke email pengguna
const sendOTP = async (email, otp, type) => {
  var mailOptions
  if(type == "EMAIL_VERIFICATION"){
    mailOptions = {
      from: `"Jahit Baju Official" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Email OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };
  }else if(type == "FORGOT_PASSWORD"){
    mailOptions = {
      from: `"Jahit Baju Official" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };
  }

  return transporter.sendMail(mailOptions);
};

// Simpan OTP di database
const saveOTP = async (userId, otp, type) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Masa berlaku 5 menit

  // Enkripsi OTP sebelum disimpan
  const { iv, encryptedOTP } = encryptOTP(otp);

  // Simpan OTP yang sudah dienkripsi ke database
  await prismaClient.oTP.create({
    data: {
      userId,
      otp: encryptedOTP,
      iv: iv,
      type : type,
      expiresAt,
    },
  });
};

// Fungsi untuk generate dan kirim OTP, serta menghapus OTP yang expired
export const generateAndSendOTP = async (userId, email, type) => {

  // Jika OTP tidak valid atau sudah expired, buat OTP baru
  const otp = generateOTP();
  
  // Hapus OTP yang kadaluarsa sebelum membuat yang baru
  await prismaClient.oTP.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(), // Menghapus OTP yang sudah expired
      },
    },
  });

  // Simpan OTP baru dan kirim ke email pengguna
  await saveOTP(userId, otp, type);
  await sendOTP(email, otp, type);

  return { message: "OTP has been successfully sent to your email." };
};

export const validateOTP = async (userId, otp, type) => {
  try {
    const otpRecord = await prismaClient.oTP.findFirst({
      where: { userId: userId, type : type },
    });

    if (!otpRecord) {
      throw new ResponseError(400, "Invalid OTP");
    }

    // Pastikan bahwa otpRecord.otp dan otpRecord.iv tidak undefined
    if (!otpRecord.otp || !otpRecord.iv) {
      throw new ResponseError(400, "OTP data is missing or invalid.");
    }

    if (new Date() > new Date(otpRecord.expiresAt)) {
      throw new ResponseError(400, "OTP has expired");
    }

    const decryptedOTP = decryptOTP(otpRecord.otp, otpRecord.iv);

    if (decryptedOTP !== otp) {
      throw new ResponseError(400, "Invalid OTP");
    }

    await prismaClient.oTP.delete({
      where: { id: otpRecord.id },
    });

    if(type == "EMAIL_VERIFICATION"){
      await prismaClient.user.update({
        where: { id: userId },
        data: { email_verified: true },
      });


    }else if(type == "FORGOT_PASSWORD"){
        
      return { message: "Email verified successfully, you can reset password now." };
    }
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};
