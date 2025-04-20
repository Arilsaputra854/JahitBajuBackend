import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  registerProductValidation,
  getProductValidation,
  updateProductValidation,
} from "../validation/product-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const productData = validate(registerProductValidation, request);

  return prismaClient.product.create({
    data: {
      ...productData,
      id: uuid(),
    },
  });
};

const get = async (id) => {
  id = validate(getProductValidation, id);

  const product = await prismaClient.product.findUnique({
    where: {
      id: id,
    },
  });

  if (!product) {
    throw new ResponseError(404, "Product not found");
  }

  return product;
};

const getByLastUpdate = async () => {
  const product = await prismaClient.product.findMany({
    select: {
      id: true,
      last_update: true,
    },
    orderBy: {
      last_update: "desc",
    },
    take: 1,
  });

  if (product.length === 0) {
    throw new ResponseError(404, "Product not found");
  }

  return product[0].last_update;
};

const update = async (id, request) => {
  id = validate(getProductValidation, id);
  const productData = validate(updateProductValidation, request);

  const productExists = await prismaClient.product.findUnique({
    where: { id: id, delete_at: null },
  });
  if (!productExists) {
    throw new ResponseError(404, "Product not found");
  }

  // Ambil image_url lama dan baru
  const oldImages = productExists.image_url || [];
  const newImages = productData.image_url || [];

  // Cari file yang tidak dipakai lagi
  const removedImages = oldImages.filter(
    (filename) => !newImages.includes(filename)
  );

  // Hapus file dari storage
  removedImages.forEach((filename) => {
    const filePath = path.join(__dirname, "../uploads", filename); // sesuaikan path
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Gagal menghapus file: ${filename}`, err.message);
      } else {
        console.log(`File dihapus: ${filename}`);
      }
    });
  });

  const updatedProductDataWithLastUpdate = {
    ...productData,
    last_update: new Date(),
  };

  return prismaClient.product.update({
    where: { id: id },
    data: updatedProductDataWithLastUpdate,
  });
};
const remove = async (id) => {
  id = validate(getProductValidation, id);

  const product = await prismaClient.product.findUnique({
    where: { id: id, delete_at: null },
  });

  if (!product) {
    throw new ResponseError(404, "Product not found");
  }

  return prismaClient.product.update({
    where: { id: id },
    data : {
      last_update: new Date(), delete_at: new Date()
    }
  });
};

const list = async () => {
  const products = await prismaClient.product.findMany({
    where: {
      enable: true,
      delete_at: null,
    },
  });

  return products;
};

const listAllProduct = async () => {
  return await prismaClient.product.findMany({
    where: {
      delete_at: null,
    },
  });
};

export default {
  register,
  get,
  listAllProduct,
  update,
  remove,
  list,
  getByLastUpdate,
};
