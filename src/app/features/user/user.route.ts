import { MANAGE_ROLE } from "../../app.types.js";
import { customRouter } from "../../routes/custom.router.js";
import { ResponseHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import userService from "./user.service.js";
import { ZUser, ZUserOptions } from "./user.types.js";

const router = customRouter();

router.get(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.all()
  },
  params(ZUser.pick({id:true})),
  async (req, res, next) => {
    try {
      const result = await userService.getUser({id: req.params.id as string});
      res.send(new ResponseHandler(result.toSafeJSON()));
    } catch(err) {
      next(err);
    }
  }
);

router.post(
  '/',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'super-admin', 
    )
  },
  body(ZUser.pick({
    name: true, 
    email: true,
    address: true,
    phoneNumber: true, 
    role: true,
    password: true
  })),
  async (req, res, next) => {
    try {
      const result = await userService.createUser(req.body);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.get(
  '/',
  { 
    isPermitted: MANAGE_ROLE.pick(
      'super-admin',
      'clinician', 
      'front-desk co-ordinator'
    )
  },
  query(ZUserOptions),
  async (req, res, next) => {
    try {
      const result = await userService.getAllUsers(req.options);
      res.send(new ResponseHandler(result.map(user => user.toSafeJSON())));
    } catch(err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.all()
  },
  params(ZUser.pick({id:true})),
  body(ZUser.pick({
    name: true, 
    email: true,
    address: true,
    phoneNumber: true, 
    password: true
  })),
  async (req, res, next) => {
    try {
      const result = await userService.updateUser(req.body, req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  { 
    isPermitted: MANAGE_ROLE.all()
  },
  params(ZUser.pick({id:true})),
  async (req, res, next) => {
    try {
      const result = await userService.deleteUser(req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
);

export default router.setRouter('/user');