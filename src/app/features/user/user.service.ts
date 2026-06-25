import { Op, type WhereOptions } from "sequelize";
import { hashPassword } from "../../utils/hash.password.js";
import userRepo from "./user.repo.js";
import { USER_RESPONSE } from "./user.response.js";
import type { User, UserOptions } from "./user.types.js";

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
    await userRepo.createUser(user);
    return USER_RESPONSE.USER_CREATED;
  } catch(err) {
    throw USER_RESPONSE.USER_NOT_CREATED;
  }
}

const getAllUsers = async (options: UserOptions, ) => {
  try {
    const where: WhereOptions<User> = {};
    const limit = options.limit ?? 10;
    const offset = options.offset ?? 0;
    const order: Array<Array<string>> = [[]];

    if(options.search) {
      where[Op.or as any] = {
        name: {
          [Op.like] : `%${options.search}%`
        },
        email: {
          [Op.like] : `%${options.search}%`
        }
      }
    }

    order[0]?.push(options.sortBy, options.orderBy);

    const allUsers = await userRepo.getAllUsers(where, limit, offset, order);
    return allUsers;
  } catch(err) {
    throw err;
  }
}

const updateUser = async (user: Partial<User>, id: string) => {
  try {
    const oldUser = await userRepo.getOneUser({id});
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;

    const isUpdated = await userRepo.updateUser(user, id);
    if(!isUpdated) throw USER_RESPONSE.USER_NOT_UPDATED;

    return USER_RESPONSE.USER_UPDATED;
  } catch(err) {
    throw err;
  }
}

const deleteUser = async (id: string) => {
  try {
    const oldUser = await userRepo.getOneUser({id});
    if(!oldUser) throw USER_RESPONSE.USER_NOT_FOUND;

    const isDeleted = await userRepo.deleteUser(id);
    if(!isDeleted) throw USER_RESPONSE.USER_NOT_DELETED;

    return USER_RESPONSE.USER_DELETED;
  } catch(err) {
    throw err;
  }
}

export default {
  getUser,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
}