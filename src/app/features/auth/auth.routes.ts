import { customRouter } from "../../routes/custom.router.js";
import { ResponseHandler } from "../../utils/response.handler.js";
import { body } from "../../utils/validate.request.js";
import { ZUser } from "../user/user.types.js";
import authService from "./auth.service.js";

const router = customRouter();

router.post(
  '/register',
  {isPublic: true},
  body(ZUser.pick({
    name: true,
    email: true,
    address: true,
    phoneNumber: true,
    password: true
  })),
  async (req, res, next) => {
    try {
      const result = await authService.register(req.body);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  {isPublic:true},
  body(ZUser.pick({
    email: true,
    password: true
  })),
  async (req, res, next) => {
    try {
      const result = await authService.loginPassword(req.body);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

export default router.setRouter('/auth');