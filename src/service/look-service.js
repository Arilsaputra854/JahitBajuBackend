import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const register = async (body) => {    
    return prismaClient.look.create({
        data: body,
        include: {
            textures: {
                include: {
                    texture: true
                }
            }
        }
    });
};

const get = async (id) => {
    const look = await prismaClient.look.findFirst({
        where: { id: id },
        include: {
            textures: {
                include: {
                    texture: true
                }
            }
        }
    });

    if (!look) {
        throw new ResponseError(404, "look not found.");
    }

    return look;
};

const update = async (id,body) => {

    const lookExists = await prismaClient.look.findUnique({ where: { id: id } });
    if (!lookExists) {
        throw new ResponseError(404, "look not found.");
    }

    return prismaClient.look.update({
        where: { id:body.id },
        data: {last_update: new Date(),
            ...body
        },
        include: {
            textures: {
                include: {
                    texture: true
                }
            }
        }
    });
};

const remove = async (id) => {

    const look = await prismaClient.look.findUnique({ where: { id: id } });
    if (!look) {
        throw new ResponseError(404, "look not found.");
    }

    return prismaClient.look.delete({ where: { id: id } });
};

const list = async () => {
    return prismaClient.look.findMany({
        include: {
            textures: {
                include: {
                    texture: true
                }
            }
        }
    });
};

export default {
    register,
    get,
    update,
    remove,
    list
};
