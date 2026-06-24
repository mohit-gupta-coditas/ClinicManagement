import { genSalt, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  try {
    const salt = await genSalt(5);
    return await hash(password, salt);
  } catch(err) {
    throw {message: 'COULD NOT HASH PASSWORD'};
  }
}