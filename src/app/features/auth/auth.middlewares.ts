import type { NextFunction, Request, Response } from "express"
import { AUTH_RESPONSE } from "./auth.response.js";
import { verifyToken } from "../../utils/jwt.helper.js";
import { env } from "../../../validate.env.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if(!token) throw AUTH_RESPONSE.TOKEN_NOT_FOUND;

    const decoded = verifyToken(token, env.JWT_SECRET_KEY);

    req.payload = decoded;

    next();
  } catch(err) {
    next(err);
  }
}

export const permissionMiddleware = (permitted: string[]) => (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!permitted.includes(req.payload.role)) throw AUTH_RESPONSE.NOT_AUTHORIZED;
    next();
  } catch(err) {
    next(err);
  }
}