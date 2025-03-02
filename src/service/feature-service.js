import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

import dotenv from 'dotenv';
import axios from "axios"; 

dotenv.config();

const XENDIT_SECRET_KEY = process.env.XENDIT_API

const customizationFeature = async (user) => {    
  console.log(user);
  const feature =  await prismaClient.customizationAccess.findFirst()
  
  if(!feature)
      throw new ResponseError(401, "feature not available.")

    // ===== Integrasi ke Xendit =====
  try {
    const xenditResponse = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: user.id,
        amount: feature.price,
        payer_email: user.email,
        description: `CUSTOMIZATION`,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(XENDIT_SECRET_KEY + ":").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    );    
    const {
      invoice_url,
      expiry_date,
      status,
      payer_email,
      description,
      external_id,
      amount,
    } = xenditResponse.data;

    return {
      invoice_url,
      expiry_date,
      status,
      payer_email,
      description,
      external_id,
      amount,
    };
  } catch (error) {
    throw new ResponseError(
      500,
      `failed to create payment invoice: ${error.response?.data?.message || error.message}`
    );
  }
};

export default {
    customizationFeature
};
