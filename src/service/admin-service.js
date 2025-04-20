import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  loginUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const login = async (request) => {
  var loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
      role : "Admin"
    },
  });

  if (!user) {
    throw new ResponseError(401, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password is invalid");
  }

  const token = uuid().toString();
    await prismaClient.user.update({
      data: {
        token: token,
        last_update: new Date(),
      },
      where: {
        email: user.email,
      },
    });

    return {
      token,
    };
};

export default {
  login,
};
