import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const XENDIT_SECRET_KEY = process.env.XENDIT_API;

const createLookOrder = async (user, body) => {
  const lookAccess = await prismaClient.lookAccess.findFirst({
    where: {
      user_id: user.id,
      look_id: body.look_id,
    },
  });

  if (!lookAccess) {
    const checkLookOrder = await prismaClient.lookOrder.findFirst({
      where : {
        look_id : body.look_id,
        buyer_id : user.id,
        expiry_date: {
          gt: new Date(),
        },
      }
    })

    if(checkLookOrder){
      return checkLookOrder;
    }
    const look = await prismaClient.look.findFirst({
      where: {
        id: body.look_id,
      },
    });

    if (!look) {
      throw new ResponseError(404, "look not found.");
    }

    const lookOrder = await prismaClient.lookOrder.create({
      data: {
        payment_status: "PENDING", 
        buyer_id: user.id,
        look_id: look.id,
        price: look.look_price,
      },
    });

    // ===== Integrasi ke Xendit =====
    try {
      const xenditResponse = await axios.post(
        "https://api.xendit.co/v2/invoices",
        {
          external_id: lookOrder.id,
          amount: lookOrder.price,
          payer_email: user.email,
          description: "BUY_LOOK",
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              XENDIT_SECRET_KEY + ":"
            ).toString("base64")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { invoice_url, expiry_date, status, description } =
        xenditResponse.data;

      return await prismaClient.lookOrder.update({
        where: { id: lookOrder.id },
        data: {
          payment_url: invoice_url,
          payment_status: status,
          description: description,
          expiry_date: expiry_date,
        },
      });
    } catch (error) {
      console.error(error);
      throw new ResponseError(
        500,
        `Gagal membuat invoice pembayaran: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  } else {
    const lookOrder = await prismaClient.lookOrder.findFirst({
      where: {
        buyer_id: user.id,
        look_id: body.look_id,
      },
    });

    if (!lookOrder) {
      throw new ResponseError(404, "Order tidak ditemukan.");
    }

    return lookOrder;
  }
};

const getLookOrder = async (id) => {
  const lookOrder = await prismaClient.lookOrder.findFirst({
    where: { id },
  });

  if (!lookOrder) {
    throw new ResponseError(404, "Look Order tidak ditemukan.");
  }

  return lookOrder;
};

export default {
  createLookOrder,
  getLookOrder,
};
