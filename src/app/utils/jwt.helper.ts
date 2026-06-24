import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Payload } from "../app.types.js";

export const signToken = (payload: Payload, secretKey: string, time: number) => {
  return jwt.sign(
    payload,
    secretKey,
    {
      expiresIn: time,
      algorithm: 'HS256'
    }
  )
};

export const verifyToken = (token: string, secretKey: string) => {
  return jwt.verify(
    token,
    secretKey  ,
    {
      algorithms: ['HS256']
    }
  ) as JwtPayload
};