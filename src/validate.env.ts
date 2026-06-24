import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(`'PORT' must be a number`),
  DB_NAME: z.string(`'DB_NAME' must be a valid string`).trim().min(1),
  DB_USERNAME: z.string(`'DB_USERNAME' must be a valid string`).trim().min(1),
  DB_PASSWORD: z.string(`'DB_PASSWORD' must be a valid string`).trim().min(1),
  REDIS_HOST: z.string(`'REDIS_HOST' must be a valid string`).trim().min(1),
  REDIS_PORT: z.coerce.number(`'REDIS_PORT' must be a valid number.`),
  REDIS_PASSWORD: z.string(`'REDIS_PASSWORD' must be a valid string.`).trim().min(1),
  REDIS_USERNAME: z.string(`'REDIS_USERNAME' must be a valid string.`).trim().min(1)
});

export const env = envSchema.parse(process.env);