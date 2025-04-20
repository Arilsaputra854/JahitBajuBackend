import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
const register = async (body) => {
  return prismaClient.look.create({
    data: body,
    include: {
      designer : true,
    },
  });
};

const get = async (id) => {
  const look = await prismaClient.look.findFirst({
    where: { id: id },
    include: {
      designer : true,
    },
  });

  if (!look) {
    throw new ResponseError(404, "look not found.");
  }

  return look;
};

const update = async (id, body) => {
  const lookExists = await prismaClient.look.findUnique({ where: { id: id } });
  if (!lookExists) {
    throw new ResponseError(404, "look not found.");
  }

  return prismaClient.look.update({
    where: { id: lookExists.id },
    data: { last_update: new Date(), ...body },
    include: {
      designer : true,
    },
  });
};

const remove = async (id) => {
  const look = await prismaClient.look.findUnique({ where: { id } });
  if (!look) {
    throw new ResponseError(404, "Look not found.");
  }

  return prismaClient.look.update({ where: { id:id },data : {
    delete_at : new Date()
  } });
};

const list = async () => {
  return prismaClient.look.findMany({
    where : {
        delete_at : null
    },
    include: {
      designer : true
    },
  });
};

export default {
  register,
  get,
  update,
  remove,
  list,
};
