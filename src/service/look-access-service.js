import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const get = async (user,look_id) => {
    const look = await prismaClient.lookAccess.findFirst({
        where: { user_id : user.id, look_id : look_id }
    });

    if (!look) {
        throw new ResponseError(404, "access denied.");
    }

    return look;
};


export default {
    get
};
