import { prismaClient } from "../application/database.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";


// Encryption Key ENV
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; 
const ALGORITHM = 'aes-256-cbc';  // Encryption Algoritm

// generate OTP Code
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Encrypt OTP 
const encryptOTP = (otp) => {
  if (!otp) {
    throw new Error('OTP is required for encryption');
  }

  const iv = crypto.randomBytes(16);  // IV (Initialization Vector)
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);
  let encryptedOTP = cipher.update(otp, 'utf8', 'base64');  //base64
  encryptedOTP += cipher.final('base64');
  return { iv: iv.toString('hex'), encryptedOTP }; 
};

// Dencrypt OTP 
const decryptOTP = (encryptedOTP, iv) => {
  if (!encryptedOTP || !iv) {
    throw new Error('Encrypted OTP and IV are required for decryption');
  }

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decryptedOTP = decipher.update(encryptedOTP, 'base64', 'utf8');  // Menggunakan base64
  decryptedOTP += decipher.final('utf8');
  return decryptedOTP;
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

// sent OTP to email by Type
const sendOTP = async (email, otp, type) => {
  var mailOptions

  // email for verification
  if(type == "EMAIL_VERIFICATION"){
    mailOptions = {
      from: `"Jahit Baju Official" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Email OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    // email for reset password
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

// save Encrypted OTP to database
const saveOTP = async (userId, otp, type) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minute OTP

  // encrypt OTP
  const { iv, encryptedOTP } = encryptOTP(otp);

  //save to database
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

// function for handle OTP
export const generateAndSendOTP = async (userId, email, type) => {

  //generate 
  const otp = generateOTP();
  
  // delete OTP if expired
  await prismaClient.oTP.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(), 
      },
    },
  });

  // save and send OTP
  await saveOTP(userId, otp, type);
  await sendOTP(email, otp, type);

  return { error: false, message: "OTP has been successfully sent to your email." };
};

// validate user OTP
export const validateOTP = async (userId, otp, type) => {


  try {

    //find OTP on database
    const otpRecord = await prismaClient.oTP.findFirst({
      where: { userId: userId, type : type },
    });

    // if not exists
    if (!otpRecord) {
      throw new ResponseError(400, "Invalid OTP");
    }

    //if OTP is invalid 
    if (!otpRecord.otp || !otpRecord.iv) {
      throw new ResponseError(400, "OTP data is missing or invalid.");
    }

    //if OTP is expired
    if (new Date() > new Date(otpRecord.expiresAt)) {
      throw new ResponseError(400, "OTP has expired");
    }

    // decrypt OTP
    const decryptedOTP = decryptOTP(otpRecord.otp, otpRecord.iv);

    // if OTP is invalid
    if (decryptedOTP !== otp) {
      throw new ResponseError(400, "Invalid OTP");
    }

    // if OTP valid then delete 
    await prismaClient.oTP.delete({
      where: { id: otpRecord.id },
    });

      // handle email verified
    if(type == "EMAIL_VERIFICATION"){
      await prismaClient.user.update({
        where: { id: userId },
        data: { email_verified: true },
      });

      // handle reset password request
    }else if(type == "FORGOT_PASSWORD"){
          
      const token = uuid().toString();
      await prismaClient.user.update({
        data: {
          token: token,
        },
        where: {
          id: userId,
        },
      });

      return {token: token};
    }
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};
