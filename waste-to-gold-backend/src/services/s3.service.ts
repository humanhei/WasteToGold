import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export async function uploadToS3(file: Express.Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
  const fileName = `${Date.now()}-${file.originalname}`;
  const s3Params: AWS.S3.PutObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  return s3.upload(s3Params).promise();
}