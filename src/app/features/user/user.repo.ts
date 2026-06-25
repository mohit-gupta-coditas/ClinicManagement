import type { WhereOptions } from "sequelize";
import type { User } from "./user.types.js";
import { UserSchema } from "../../connections/associations.js";

const createUser = (user: Pick<User, "name" | "email" | "password" | "phoneNumber" | "address" | "role">) => UserSchema.create(user);

const getOneUser = (user: Partial<User>) => UserSchema.findOne({where: user});

const getAllUsers = (where: WhereOptions<Pick<User, "name" | "email" | "phoneNumber" | "role">>, limit: number, offset: number, order: any) => UserSchema.findAll({where, limit, offset, order});

const updateUser = (user: Partial<User>, id: string) => UserSchema.update(user, {where: {id}});

const deleteUser = (id: string) => UserSchema.destroy({where: {id}});

export default{
  createUser,
  updateUser,
  getAllUsers,
  getOneUser,
  deleteUser
}