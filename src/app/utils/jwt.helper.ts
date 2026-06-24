import jwt from "jsonwebtoken";

export const signToken = (payload: string, secretKey: string, time: number) => {
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
  )
};