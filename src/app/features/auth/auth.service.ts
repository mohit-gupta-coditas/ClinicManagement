import { compare } from "bcryptjs";
import userService from "../user/user.service.js";
import type { User } from "../user/user.types.js";
import { AUTH_RESPONSE } from "./auth.response.js";
import { signToken } from "../../utils/jwt.helper.js";
import { privateKey } from "../../utils/jwt.keys.js";
import { env } from "../../../validate.env.js";

const register = async (user: Pick<User, "name" | "email" | "address" | "phoneNumber" | "password">) => {
  try {
    await userService.createUser({...user, role: 'patient'});
    return AUTH_RESPONSE.USER_REGISTERED;
  } catch(err) {
    throw AUTH_RESPONSE.USER_NOT_REGISTERED;
  }
}

const loginPassword = async (credentials: Pick<User, "email" | "password">) => {
  try {
    const user = await userService.getUser({email: credentials.email});

    const isValid = await compare(credentials.password, user.password);

    if(!isValid) throw AUTH_RESPONSE.INVALID_CREDENTIALS;

    const accessToken = signToken(
      {
        userId: user.id,
        role: user.role
      },
      privateKey,
      env.ACCESS_TOKEN_TIME
    )

    return {...AUTH_RESPONSE.LOGIN_SUCCESS, accessToken};
  } catch(err: any) {
    if(err.message === "USER NOT FOUND") {
      throw AUTH_RESPONSE.INVALID_CREDENTIALS;
    }
    throw AUTH_RESPONSE.LOGIN_FAILED;
  }
}

export default {
  register,
  loginPassword
}