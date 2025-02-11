import express from "express";
import { prismaClient } from "../application/database.js";

const router = express.Router();

const createOrder = async (req, res) => {
  try {
    // Data dari webhook
    const { id, external_id, status, paid_at, payment_method } = req.body;
    console.log(req.body);

    // Pastikan webhook berasal dari Xendit (opsional, misalnya dengan verifikasi IP atau signature)

    if (status === "PAID") {
      // Update status order menjadi 'PROCESS'
      await prismaClient.order.update({
        where: { id: external_id }, // external_id di Xendit sesuai dengan order.id
        data: {
          payment_date: paid_at,
          xendit_status : status,
          payment_method: payment_method,
          order_status: "PROCESS",
          last_update: new Date(),
        },
      });

    }

    // Berikan respons sukses ke Xendit
    res.status(200).send({ message: "Webhook processed successfully" });
  } catch (error) {
    console.error("Error processing webhook:", error.message);

    // Berikan respons gagal ke Xendit
    res.status(500).send({ message: "Failed to process webhook" });
  }
};

export default {
  createOrder,
};
