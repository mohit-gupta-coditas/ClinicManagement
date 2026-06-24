import type { WhereOptions } from "sequelize";
import { UserSchema } from "./user.schema.js";
import type { User } from "./user.types.js";

const createUser = (user: Pick<User, "name" | "email" | "password" | "phoneNumber" | "address" | "role" | "createdBy">) => UserSchema.create(user);

const getOneUser = (user: Partial<User>) => UserSchema.findOne({where: user});

const getAllUsers = (where: WhereOptions<Pick<User, "name" | "email" | "phoneNumber" | "role">>, limit: number, offset: number, order: any) => UserSchema.findAll({where, limit, offset, order});

const updateUser = (user: Partial<User>, id: string) => UserSchema.update(user, {where: {id}});

export default{
  createUser,
  updateUser,
  getAllUsers,
  getOneUser
}