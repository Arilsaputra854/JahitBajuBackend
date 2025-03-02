import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const register = async (body) => {    
    return prismaClient.customizationAccess.create({
        data: body
    });
};

const get = async () => {
    const access = await prismaClient.customizationAccess.findFirst(); // Ambil satu-satunya data

    if (!access) {
        throw new ResponseError(404, "Customization access not found.");
    }

    return access;
};

const update = async (body) => {
    const customization = await prismaClient.customizationAccess.findFirst(); // Ambil data pertama

    if (!customization) {
        throw new ResponseError(404, "Customization access not found.");
    }

    return prismaClient.customizationAccess.update({
        where: { id: customization.id }, // Pastikan hanya update row pertama
        data: body
    });
};

export default {
    register,
    get,
    update
};
