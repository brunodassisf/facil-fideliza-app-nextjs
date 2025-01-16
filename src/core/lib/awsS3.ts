import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFileToS3(
  buffer: Buffer,
  Key: string,
  type: string
) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key,
    Body: buffer,
    ContentType: type,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  return Key;
}

export async function deleteFileToS3(Key: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: Key,
  };

  const command = new DeleteObjectCommand(params);
  await s3Client.send(command);

  return Key;
}
