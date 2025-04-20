// Service: Updated and cleaned up functions
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const add = async (body) => {
  if (!body || !body.data) {
    throw new ResponseError(400, "care guide are required.");
  }

  var careGuide = await prismaClient.careGuide.create({
    data: {
      data: body.data,
    },
  });

  return careGuide;
};

const update = async (body) => {
  let careGuide = await prismaClient.careGuide.findFirst();

  const careGuideUpdated = await prismaClient.careGuide.update({
    where: { id: careGuide.id },
    data: { data: body.data, last_update: new Date() },
  });

  return careGuideUpdated;
};

const get = async (body) => {
  let careGuide = await prismaClient.careGuide.findFirst({
    where: { id: body.id },
    select: { id: true, data: true },
  });

  if (!careGuide) throw new ResponseError(404, "care guide not found.");
  return careGuide;
};

export default {
  add,
  update,
  get,
};
