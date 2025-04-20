import express from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

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
          },
        });
      }
    }
    if (description == "CUSTOMIZATION") {
      if (status === "PAID") {
        
        const featureOrder = await prismaClient.featureOrder.update({
          where: {  id: external_id},
          data: {
            payment_status : status,
            payment_date : paid_at,
            payment_method: payment_method
          },
        });

        await prismaClient.user.update({
          where: { id: featureOrder.buyer_id },
          data: {
            custom_access : true
          },
        });
      }
    }
    if (description == "BUY_LOOK") {
      if (status === "PAID") {
        const lookOrder  = await prismaClient.lookOrder.findFirst({
          where : {
            id : external_id
          }
        })
        if(lookOrder){
          await prismaClient.lookOrder.update({
            where: {  id: external_id},
            data: {
              payment_status : status,
              payment_date : paid_at,
              payment_method: payment_method
            },
          });   

          await prismaClient.lookAccess.create({
            data:{
              look_id : lookOrder.look_id,
              user_id : lookOrder.buyer_id,
              last_update : new Date(),
              purchased_at : paid_at,              
            }
          })
        }else{
          console.log("Failed to get look order by id :",req.body);
          throw new ResponseError(500, "Failed to get look order by id :",req.body);
        }
                 
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
