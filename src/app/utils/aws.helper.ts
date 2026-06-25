import { SendEmailCommand } from "@aws-sdk/client-ses";
import { s3Client, sesClient } from "../connections/aws.connection.js";
import { env } from "../../validate.env.js";
import multer from "multer";
import multerS3 from "multer-s3"
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

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

 
export const uploadToS3 = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: env.AWS_S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { 
        fieldName: file.fieldname,
      });
    },
    key: function(req, file, cb) {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  }),
  fileFilter: function (req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024*1024*5
  }
});

export const getPresignedURL = async (key: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: env.AWS_S3_BUCKET_NAME,
      Key: key
    });

    return await getSignedUrl(s3Client, command, {expiresIn: 6000});
  } catch(err) {
    throw err;
  }
}