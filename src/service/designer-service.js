import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { registerDesignerValidation, getDesignerValidation, updateDesignerValidation } from "../validation/designer-validation.js";
import { validate } from "../validation/validation.js";

const register = async (request) => {
    const designerData = validate(registerDesignerValidation, request);
    return prismaClient.designer.create({
        data: designerData,
        include: {
            looks: true
        }
    });
};

const get = async (id) => {
    id = validate(getDesignerValidation, id);

    const designer = await prismaClient.designer.findUnique({
        where: { id: id },
        include: {
            looks: {
                include: {
                    textures: {
                        include: {
                            texture: true
                        }
                    }
                }
            }
        }
    });

    if (!designer) {
        throw new ResponseError(404, "designer not found.");
    }

    return designer;
};

const update = async (id, request) => {
    id = validate(getDesignerValidation, id);
    const designerData = validate(updateDesignerValidation, request);

    const designerExists = await prismaClient.designer.findUnique({ where: { id: id } });
    if (!designerExists) {
        throw new ResponseError(404, "designer not found.");
    }

    return prismaClient.designer.update({
        where: { id: id },
        data: designerData,
        include: {
            looks: true
        }
    });
};

const remove = async (id) => {
    id = validate(getDesignerValidation, id);

    const designer = await prismaClient.designer.findUnique({ where: { id: id } });
    if (!designer) {
        throw new ResponseError(404, "designer not found.");
    }

    return prismaClient.designer.delete({ where: { id: id } });
};

const list = async () => {
    return prismaClient.designer.findMany({
        include: {
            looks: {
                include: {
                    textures: {
                        include: {
                            texture: true
                        }
                    }
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
