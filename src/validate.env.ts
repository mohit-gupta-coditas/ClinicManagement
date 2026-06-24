import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(`'PORT' must be a number`),
  DB_NAME: z.string(`'DB_NAME' must be a valid string`).trim().min(1),
  DB_USERNAME: z.string(`'DB_USERNAME' must be a valid string`).trim().min(1),
  DB_PASSWORD: z.string(`'DB_PASSWORD' must be a valid string`).trim().min(1),
});

export const env = envSchema.parse(process.env);