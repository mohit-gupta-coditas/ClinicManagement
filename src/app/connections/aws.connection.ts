import { SESClient } from "@aws-sdk/client-ses";
import { env } from "../../validate.env.js";
import { S3Client } from "@aws-sdk/client-s3";

export const sesClient = new SESClient({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const s3Client = new S3Client({
  region: env.AWS_REGION,
  credentials: {
      accessKeyId: env.AWS_ACCESS_KEY,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
  },
})