import { hashPassword } from "../../utils/hash.password.js";
import userRepo from "./user.repo.js";
import { USER_RESPONSE } from "./user.response.js";
import type { User } from "./user.types.js";

const getUser = async (user: Partial<User>) => {
  try {
    const oldUser = await userRepo.getOneUser(user);
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;

    return oldUser;
  } catch(err) {
    throw err;
  }
}

const createUser = async (user: Pick<User, "name" | "email" | "address" | "phoneNumber" | "role" | "password">) => {
  try {
    const oldUser = await userRepo.getOneUser({email: user.email});
    if(oldUser) throw USER_RESPONSE.USER_ALREADY_EXISTS;

    user.password = await hashPassword(user.password);
    console.log(user);
    await userRepo.createUser(user);
  } catch(err) {
    console.log(err);
    throw USER_RESPONSE.USER_NOT_CREATED;
  }
}

export default {
  getUser,
  createUser
}