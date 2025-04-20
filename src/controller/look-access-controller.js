import { ResponseError } from "../error/response-error.js";
import lookAccessService from "../service/look-access-service.js";


const get = async (req, res, next) => {
  try {
    const lookId = req.params.look_id;
    if(!lookId){
      throw new ResponseError(400, "look id is required")
    }
    const result = await lookAccessService.get(req.user,lookId);
    res.status(200).json({
      error: false,
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  get,
};
