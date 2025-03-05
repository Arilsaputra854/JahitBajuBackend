import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

import dotenv from 'dotenv';
import axios from "axios"; 

dotenv.config();

const XENDIT_SECRET_KEY = process.env.XENDIT_API

const buyCustomizationFeature = async (user) => {    
  const feature =  await prismaClient.appFeature.findFirst(
    {
      where:{
        type : "CUSTOMIZATION"
      }
    }
  )
  
  if(!feature)
      throw new ResponseError(401, "feature not available.")

  const featureOrder =  await prismaClient.featureOrder.create({
    data:{
      payment_status : "PENDING",
      buyer_id : user.id,
      feature_id : feature.id,
      price : feature.price      
    }
  });

    // ===== Integrasi ke Xendit =====
  try {
    const xenditResponse = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: featureOrder.id,
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
      description
    } = xenditResponse.data;

    const updatedFeatureOrder = await prismaClient.featureOrder.update({
      where : {
        id : featureOrder.id        
      },
      data : {
        payment_url : invoice_url,
        payment_status : status,
        description : description,  
        expiry_date : expiry_date,      
      }
    })
    return updatedFeatureOrder;
  } catch (error) {
    throw new ResponseError(
      500,
      `failed to create payment invoice: ${error.response?.data?.message || error.message}`
    );
  }


};


const createFeature = async (body) =>{
  const feature =  await prismaClient.appFeature.findFirst(
    {
      where:{
        type : body.type
      }
    }
  )
  
  if(feature)
      throw new ResponseError(401, "feature type already exist.")

  const createFeature = await prismaClient.appFeature.create({
    data : {
      description : body.description,
      name : body.name,
      type : body.type,
      price : body.price,
    }
  })

  return createFeature;
}

const listFeatures = async () =>{
  const result = await prismaClient.appFeature.findMany();
  return result;
}


const getFeature = async (type) =>{
  const feature =  await prismaClient.appFeature.findFirst(
    {
      where:{
        type
      }
    }
  )
  
  if(!feature)
      throw new ResponseError(401, "feature not available.")

  return feature;
}


const updateFeature = async (body) =>{
  const feature =  await prismaClient.appFeature.findFirst(
    {
      where:{
        id : body.id
      }
    }
  )
  
  if(!feature)
      throw new ResponseError(401, "feature not available.")

  const updatedFeature = await prismaClient.appFeature.update({
    where : {
      id : body.id
    },
    data : {
      description : body.description,
      name : body.name,
      type : body.type,
      price : body.price,      
      last_update : new Date()
    }
  })

  return updatedFeature;
}


const getOrderFeature = async (id) =>{
  const feature =  await prismaClient.featureOrder.findFirst(
    {
      where:{
        id : id
      }
    }
  )
  
  if(!feature)
      throw new ResponseError(401, "order feature not found.")

  return feature;
}


export default {
  createFeature,
  buyCustomizationFeature,
  listFeatures,
  getFeature,
  updateFeature,
  getOrderFeature
};
