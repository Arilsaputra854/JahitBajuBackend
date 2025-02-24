import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (body) => {
  if (!body) {
    throw new ResponseError(400, "product texture are required");
  }

  var texture = await prismaClient.texture.create({
    data: {
        ...body,
    },
  });

  return texture;
};

const update = async (id, body) => {
  let texture = await prismaClient.texture.findFirst({
    where: { id: id },
  });

  if (!texture) throw new ResponseError(404, "product texture not found.");

  const textureUpdated = await prismaClient.texture.update({
    where: { id: body.id },
    data: body.data,
    select: {
      id: true,
      data: true,
    },
  });

  return textureUpdated;
};

const get = async (id) => {
  let texture = await prismaClient.texture.findFirst({
    where: { id: id },
  });

  if (!texture) throw new ResponseError(404, "product texture not found.");
  return texture;
};

const remove = async (body) => {
  let texture = await prismaClient.sizeGuide.findFirst({
    where: { id: body.id },
  });

  if (!texture) throw new ResponseError(404, "product texture not found.");

  let textureRemoved = await prismaClient.texture.delete({
    where: { id: body.id },
  });
  return textureRemoved;
};

const list = async () => {
  let textures = await prismaClient.texture.findMany();
  return textures;
};

export default {
  add,
  update,
  remove,
  get,
  list,
};
