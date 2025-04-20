// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import {
  validateShippingMethod,
  validateUpdateShippingMethod,
} from "../validation/shipping-method-validation.js";
import { validate } from "../validation/validation.js";
import dotenv from "dotenv";
import axios from "axios";


dotenv.config();
const RAJAONGKIR_SECRET_KEY = process.env.RAJAONGKIR_API;

const addShippingMethod = async (req) => {
  var body = validate(validateShippingMethod, req);

  let shipping = await prismaClient.shipping.findFirst({
    where: { name: body.name },
  });

  if (!shipping) {
    shipping = await prismaClient.shipping.create({
      data: {
        id: uuid(),
        name: body.name,
        img_url: body.img_url,
        type: body.type,
      },
    });
  }

  return shipping;
};

const updateShippingMethod = async (req) => {
  var body = validate(validateUpdateShippingMethod, req);

  let shipping = await prismaClient.shipping.findFirst({
    where: { id: body.id },
  });

  if (!shipping) throw new ResponseError(404, "Shipping method not found");

  // Prepare the update data
  const updateData = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.img_url !== undefined) updateData.img_url = body.img_url;
  if (body.type !== undefined) updateData.type = body.type;

  // Update the cart item
  const updatedShippingMethod = await prismaClient.shipping.update({
    where: { id: body.id },
    data: { last_update: new Date(), ...updateData },
  });

  return updatedShippingMethod;
};

const listShippingMethods = async (body, user) => {
  const listShipping =  await prismaClient.shipping.findMany();
  
  const shippingWithCost = await Promise.all(
    listShipping.map(async (shipping) => {
      try {
        const price = await getShippingCost({ ...body, courier: shipping.code }, user);
        return { ...shipping, price };
      } catch (error) {
        console.error(`failed to get cost for ${shipping.code}:`, error.message);
        return { ...shipping, price: null };
      }
    })
  );

  return shippingWithCost;
};

// get shipping cost
const getShippingCost = async (body, user) => {
  let address;
  if(user.address_id){
    
   address = await prismaClient.address.findFirst({
    where: { id: user.address_id },
  });
  }

  var destinationCode;
  var originCode;
  var cityCode;

  if(body.destination != null && body.origin != null){
    originCode = await findCityCodeByCity(body.origin);
    destinationCode = await findCityCodeByCity(body.destination);
  }else{
    cityCode = await findCityCode(address);
  }

  //get cost of shipping
  try {
    const params = new URLSearchParams();
    params.append("origin", originCode ?? "457");
    params.append("destination", destinationCode ?? cityCode.toString());
    params.append("weight", body.total_weight.toString());
    params.append("courier", body.courier);

    const response = await axios.post(
      "https://api.rajaongkir.com/starter/cost",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          key: RAJAONGKIR_SECRET_KEY, 
        },
      }
    );

    return response.data.rajaongkir.results[0]?.costs[0]?.cost[0]?.value;;
  } catch (error) {
    console.error("Error fetching city:", error.message);

    if (error.response) {
      console.error("Response error data:", error.response.data);
    }

    throw new ResponseError(500, "cannot get list of city.");
  }

};


const removeShippingMethods = async (body) => {
  validate(validateShippingMethod, body);

  const shippingMethod = await prismaClient.shipping.findFirst({
    where: { name: body.name },
  });
  if (!shippingMethod)
    throw new ResponseError(404, "Shipping method not found");

  return prismaClient.shipping.delete({ where: { name: body.name } });
};


const getShipingMethodById = async (id,body, user) => {

  const shipping = await prismaClient.shipping.findFirst({
    where : {
      id: id
    }
  })

  if(!shipping){
    throw new ResponseError(400, "shipping not found.");
  }

  if(body.total_weight){
    const price = await getShippingCost({ ...body, courier: shipping.code }, user);
  return { ...shipping, price };
  }else{
    return shipping;
  }
  
};

// Retrieve list of province
const listProvince = async () => {
  try {
    const rajaongkirResponse = await axios.get(
      "https://api.rajaongkir.com/starter/province",
      {
        headers: {
          key: RAJAONGKIR_SECRET_KEY,
        },
      }
    );

    if (!rajaongkirResponse.data) {
      throw new Error("list of province is empty.");
    }

    return rajaongkirResponse.data.rajaongkir.results;
  } catch (error) {
    console.error("Error fetching provinces:", error.message);

    if (error.response) {
      console.error("Response error data:", error.response.data);
    }

    throw new ResponseError(500, "Cannot get list of provinces.");
  }
};


// Retrieve province by id
const getProvinceById = async (id) => {
  try {
    const rajaongkirResponse = await axios.get(
      "https://api.rajaongkir.com/starter/province?id=" + id,
      {
        headers: {
          key: RAJAONGKIR_SECRET_KEY,
        },
      }
    );

    if (!rajaongkirResponse.data) {
      throw new Error("list of province is empty.");
    }

    return rajaongkirResponse.data.rajaongkir.results.province;
  } catch (error) {
    console.error("Error fetching provinces:", error.message);

    if (error.response) {
      console.error("Response error data:", error.response.data);
    }

    throw new ResponseError(500, "Cannot get list of provinces.");
  }
};
const findCityCode = async (address) => {

  // Ambil daftar kota dari fungsi listCity()
  const cities = await listCity();

  // Cari city_id berdasarkan city_name
  const city = cities.find(c => c.city_name.toLowerCase() === address.city.toLowerCase());

  // Kembalikan city_id atau null jika tidak ditemukan
  return city ? city.city_id : null;
};


;
const findCityCodeByCity = async (cityName) => {

  // Ambil daftar kota dari fungsi listCity()
  const cities = await listCity();

  // Cari city_id berdasarkan city_name
  const city = cities.find(c => c.city_name.toLowerCase() === cityName.toLowerCase());

  // Kembalikan city_id atau null jika tidak ditemukan
  return city ? city.city_id : null;
};



// Retrieve list of City
const listCity = async () => {
  try {
    const rajaongkirResponse = await axios.get(
      "https://api.rajaongkir.com/starter/city",
      {
        headers: {
          key: RAJAONGKIR_SECRET_KEY,
        },
      }
    );

    if (!rajaongkirResponse.data) {
      throw new Error("list of city is empty.");
    }

    return rajaongkirResponse.data.rajaongkir.results;
  } catch (error) {
    console.error("Error fetching city:", error.message);

    if (error.response) {
      console.error("Response error data:", error.response.data);
    }

    throw new ResponseError(500, "Cannot get list of city.");
  }
};


// Retrieve city by id
const getCityById = async (id) => {
  try {
    const rajaongkirResponse = await axios.get(
      "https://api.rajaongkir.com/starter/city?id=" + id,
      {
        headers: {
          key: RAJAONGKIR_SECRET_KEY,
        },
      }
    );

    if (!rajaongkirResponse.data) {
      throw new Error("list of province is empty.");
    }

    return rajaongkirResponse.data.rajaongkir.results;
  } catch (error) {
    console.error("Error fetching provinces:", error.message);

    if (error.response) {
      console.error("Response error data:", error.response.data);
    }

    throw new ResponseError(500, "Cannot get list of provinces.");
  }
};

export default {
  addShippingMethod,
  getShipingMethodById,
  getCityById,
  getShippingCost,
  getProvinceById,
  updateShippingMethod,
  listShippingMethods,
  removeShippingMethods,
  listProvince,
  listCity,
};
