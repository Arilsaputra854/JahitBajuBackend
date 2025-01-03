import express from 'express';
import { prismaClient } from "../application/database.js";

const router = express.Router();

const createOrder = async (req, res) => {
    try {
        // Data dari webhook
        const { id, external_id, status } = req.body;
    
        // Pastikan webhook berasal dari Xendit (opsional, misalnya dengan verifikasi IP atau signature)
    
        if (status === 'PAID') {
          // Update status order menjadi 'PROCESS'
          await prismaClient.order.update({
            where: { id: external_id }, // external_id di Xendit sesuai dengan order.id
            data: {
              order_status: 'PROCESS',
              last_update: new Date(),
            },
          });
    
          console.log(`Order ${external_id} updated to PROCESS`);
        }
    
        // Berikan respons sukses ke Xendit
        res.status(200).send({ message: 'Webhook processed successfully' });
      } catch (error) {
        console.error('Error processing webhook:', error.message);
    
        // Berikan respons gagal ke Xendit
        res.status(500).send({ message: 'Failed to process webhook' });
      }
};

export default{
    createOrder
}
