import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../connections/aws.connection.js";
import { env } from "../../validate.env.js";

export const sendEmail = async (
    to: string,
    subject: string,
    html: string
) => {
  try {
    const command = new SendEmailCommand({
      Source: env.SES_SENDER_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
            Data: subject,
        },
        Body: {
          Html: {
            Data: html,
          },
        },
      },
    });

    const result = await sesClient.send(command);
    console.log(result);
  } catch(err) {
    throw err;
  }
};
