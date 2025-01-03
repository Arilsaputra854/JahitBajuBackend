import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validateOrder } from "../validation/order-validation.js";
import { v4 as uuid } from "uuid";

const addFavorite = async (request) => {
  // Cek apakah produk ada
  const product = await prismaClient.product.findUnique({
    where: { id: request.body.product_id },
  });

  if (!product) {
    throw new ResponseError(400, "Product not found.");
  }

  console.log(request)

  // Tambahkan favorite
  const favorite = await prismaClient.favorite.create({
    data: {
      user: {
        connect: { id: request.user.id }, 
      },
      product: {
        connect: { id: request.body.product_id }, 
      },
    },
    select: {
      id: true,
      user_id: true,
      product_id: true,
    },
  });

  return favorite;
};

// Get Order by ID
const getFavoriteByUserId = async (user_id) => {
  const favorite = await prismaClient.favorite.findMany({
    where: {
      user: {
        id: user_id,
      },
    },
    select: {
      id: true,
      user_id: true,
      product_id: true,
    },
  });

  if (!favorite) {
    throw new ResponseError(404, "Favorite data not found.");
  }

  return favorite;
};

// Remove Order
const removeFavorite = async (id) => {
  const favorite = await prismaClient.favorite.findUnique({
    where: { id: id },
  });

  if (!favorite) {
    throw new ResponseError(404, "Favorite data not found.");
  }

  return prismaClient.favorite.delete({
    where: { id: id },
  });
};

// List Orders
const getAllFavorites = async () => {
  return prismaClient.favorite.findMany({
    select: {
      id: true,
      user_id: true,
      product_id: true,
    },
  });
};

const getProductFavoriteCount = async (product_id) => {
  // Hitung jumlah favorit untuk product_id
  const favoriteCount = await prismaClient.favorite.count({
    where: {
      product: {
        id: product_id, // Mengakses 'id' di relasi 'product'
      },
    },
  });

  if (favoriteCount === 0) {
    throw new ResponseError(404, "No favorites found for this product.");
  }

  return favoriteCount;
};

export default {
  addFavorite,
  getFavoriteByUserId,
  removeFavorite,
  getAllFavorites,
  getProductFavoriteCount,
};
