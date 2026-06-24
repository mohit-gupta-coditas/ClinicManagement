import { SESClient } from "@aws-sdk/client-ses";
import { env } from "../../validate.env.js";

export const sesClient = new SESClient({
    region: env.AWS_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
});