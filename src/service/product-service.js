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
            category: true,
            size: true,
            colors : true,
            features : true,
            designer_category : true,
            last_update : true
        }
    });
};

const get = async (id) => {
    
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
            images_url: true, 
            tags: true,
            category: true,
            size: true,
            colors : true,
            features : true,
            designer_category : true,
            last_update : true
        }
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
            last_update : true
        },
        orderBy: {
            last_update: 'desc',
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
    const updatedProductDataWithLastUpdate = {
        ...productData,
        last_update: new Date(), 
    };

    const productExists = await prismaClient.product.findUnique({ where: { id: id } });
    if (!productExists) {
        throw new ResponseError(404, "Product not found");
    }

    return prismaClient.product.update({
        where: { id: id },
        data: updatedProductDataWithLastUpdate,
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
            category: true,
            size: true,
            colors : true,
            features : true,
            designer_category : true,
            last_update : true
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
            category: true,
            tags: true,
            size: true,
            colors: true,
            features: true,
            designer_category : true,
            last_update : true
        }
    });
  
    
    return products;
  };
  

export default {
    register,
    get,
    update,
    remove,
    list,
    getByLastUpdate
};

