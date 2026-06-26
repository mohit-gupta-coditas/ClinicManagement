import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number(`'PORT' must be a number`),
  DB_NAME: z.string(`'DB_NAME' must be a valid string`).trim().min(1),
  DB_USERNAME: z.string(`'DB_USERNAME' must be a valid string`).trim().min(1),
  DB_PASSWORD: z.string(`'DB_PASSWORD' must be a valid string`).trim().min(1),
  REDIS_HOST: z.string(`'REDIS_HOST' must be a valid string`).trim().min(1),
  REDIS_PORT: z.coerce.number(`'REDIS_PORT' must be a valid number.`),
  REDIS_PASSWORD: z.string(`'REDIS_PASSWORD' must be a valid string.`).trim().min(1),
  REDIS_USERNAME: z.string(`'REDIS_USERNAME' must be a valid string.`).trim().min(1),
  ACCESS_TOKEN_TIME: z.coerce.number(`'ACCESS_TOKEN_TIME' must be a number.`),
  AWS_REGION: z.string(`'AWS_REGION' must be a valid string`).trim().min(1),
  AWS_ACCESS_KEY: z.string(`'AWS_REGION' must be a valid string`).trim().min(1),
  AWS_SECRET_ACCESS_KEY: z.string(`'AWS_REGION' must be a valid string`).trim().min(1),
  SES_SENDER_EMAIL: z.email(`'SES_SENDER_EMAIL' must be a valid string`).trim().min(1),
  JWT_SECRET_KEY: z.string(`'JWT_SECRET_KEY' must be a valid string`).trim().min(1),
  FRONT_END_URL: z.string(`'FRONT_END_URL' must be a string`).trim().min(1),
  AWS_S3_BUCKET_NAME: z.string(`'AWS_S3_BUCKET_NAME' must be a valid string`).trim().min(1),
  CLINIC_OPEN_TIME: z.iso.time(`'CLINIC_OPEN_TIME' must be a valid time`),
  CLINIC_CLOSE_TIME: z.iso.time(`'CLINIC_CLOSE_TIME' must be a valid time`)
});

export const env = envSchema.parse(process.env);