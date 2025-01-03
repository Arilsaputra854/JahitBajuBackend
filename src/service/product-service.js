import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerProductValidation, getProductValidation ,updateProductValidation} from "../validation/product-validation.js";
import { validate } from "../validation/validation.js";
import { v4 as uuid } from 'uuid';

const register = async (request) => {
    
    const productData = validate(registerProductValidation, request);

    return prismaClient.product.create({
        data: {
            ...productData,
            id: uuid(), 
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            sold: true,
            seen: true,
            favorite: true,
            type: true,
            images_url: true,
            tags: true,
            size: true,
            colors : true,
            features : true,
        }
    });
};

const get = async (id) => {
    // Validate the product ID using getProductValidation
    id = validate(getProductValidation, id);

    const product = await prismaClient.product.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            sold: true,
            seen: true,
            favorite: true,
            type: true,
            images_url: true, // Ensure this is fetched as an array
            tags: true,
            size: true,
            colors : true,
            features : true,
        }
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    return product;
};

const update = async (id, request) => {
    id = validate(getProductValidation, id); // Validate the product ID
    const productData = validate(updateProductValidation, request); // Validate update data

    const productExists = await prismaClient.product.findUnique({ where: { id: id } });
    if (!productExists) {
        throw new ResponseError(404, "Product not found");
    }

    return prismaClient.product.update({
        where: { id: id },
        data: productData,
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            sold: true,
            seen: true,
            favorite: true,
            type: true,
            images_url: true,
            tags: true,
            size: true,
            colors : true,
            features : true,
        }
    });
};
const remove = async (id) => {
    id = validate(getProductValidation, id);

    const product = await prismaClient.product.findUnique({
        where: { id: id }
    });

    if (!product) {
        throw new ResponseError(404, "Product not found");
    }

    return prismaClient.product.delete({
        where: { id: id }
    });
};

const list = async () => {
    const products = await prismaClient.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            stock: true,
            sold: true,
            seen: true,
            favorite: true,
            type: true,
            images_url: true,
            tags: true,
            size: true,
            colors: true,
            features: true,
        }
    });
  
    console.log(products); // Log the result to see the structure
    return products;
  };
  

export default {
    register,
    get,
    update,
    remove,
    list // Export the new list function
};

