import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const register = async (body) => {
  return await prismaClient.$transaction(async (prisma) => {
    const texture = await prisma.texture.create({
      data: {
        product_id: body.product_id,
        title: body.title,
        url_texture: body.url_texture,
        hex: body.hex,
        description: body.description,
      },
    });
    return texture;
  });
};

const get = async (id) => {
  const texture = await prismaClient.texture.findUnique({
    where: { id: id },
  });

  if (!texture) {
    throw new ResponseError(404, "texture not found.");
  }

  return texture;
};

const update = async (id, body) => {
  const textureExists = await prismaClient.texture.findUnique({
    where: { id: id },
  });
  if (!textureExists) {
    throw new ResponseError(404, "texture not found.");
  }

  return prismaClient.texture.update({
    where: { id: body.id },
    data: {
      last_update: new Date(),
      ...body,
    },
  });
};

const remove = async (id) => {
  const texture = await prismaClient.texture.findUnique({ where: { id: id } });
  if (!texture) {
    throw new ResponseError(404, "texture not found.");
  }

  return prismaClient.texture.delete({ where: { id: id } });
};

const list = async () => {
  return prismaClient.texture.findMany();
};

export default {
  register,
  get,
  update,
  remove,
  list,
};
