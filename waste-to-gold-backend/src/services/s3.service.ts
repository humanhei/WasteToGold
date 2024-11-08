import S3 from 'aws-sdk/clients/s3';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  signatureVersion: 'v4'
});

export async function uploadToS3(file: Express.Multer.File): Promise<S3.ManagedUpload.SendData> {
  const fileName = `${Date.now()}-${file.originalname}`;
  const s3Params: S3.PutObjectRequest = {
    ACL: 'public-read',
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype
  };

  return s3.upload(s3Params).promise();
}

export async function deleteObjS3(key: string): Promise<S3.DeletedObject> {
  const s3Params: S3.DeleteObjectRequest = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key
  };

  return s3.deleteObject(s3Params).promise();
}