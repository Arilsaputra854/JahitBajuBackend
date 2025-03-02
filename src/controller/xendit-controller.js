import express from "express";
import { prismaClient } from "../application/database.js";

const router = express.Router();

const createOrder = async (req, res) => {
  try {
    // Data dari webhook
    const { id, external_id, status, paid_at, payment_method, description } =
      req.body;


    if (description == "PRODUCT") {
      if (status === "PAID") {
        // Update status order menjadi 'PROCESS'
        await prismaClient.order.update({
          where: { id: external_id }, // external_id di Xendit sesuai dengan order.id
          data: {
            payment_date: paid_at,
            xendit_status: status,
            payment_method: payment_method,
            order_status: "PROCESS",
            last_update: new Date(),
          },
        });
      }
    }
    if (description == "CUSTOMIZATION") {
      if (status === "PAID") {
        
        await prismaClient.user.update({
          where: { id: external_id },
          data: {
            custom_access : true
          },
        });
      }
    }

    // Berikan respons sukses ke Xendit
    res.status(200).send({ message: "webhook processed successfully" });
  } catch (error) {
    console.error("error processing webhook:", error.message);

    // Berikan respons gagal ke Xendit
    res.status(500).send({ message: "failed to process webhook" });
  }
};

export default {
  createOrder,
};
