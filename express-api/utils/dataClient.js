import { S3Client } from "@aws-sdk/client-s3";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const s3 = new S3Client({
  region: "Singapore",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
  },
  endpoint: `https://${process.env.AWS_ENDPOINT}`,
});

export { s3, prisma };
