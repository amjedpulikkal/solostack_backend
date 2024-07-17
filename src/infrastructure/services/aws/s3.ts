import { S3Client, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const run = async () => {
  try {
    const data = await s3.send(new ListBucketsCommand({}));
    console.log('Success', data.Buckets);
  } catch (err) {
    console.log('Error', err);
  }
};
run();

export class AwsS3 {
  getRandomFileName(type: string): string {
    return `${new Date().getTime()}_${Math.random()}.${type}`;
  }

  async uploadFile(file: Buffer, type: string): Promise<string | boolean> {
    try {
      const path = this.getRandomFileName(type);
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: path,
        Body: file,
      };

      const data = await s3.send(new PutObjectCommand(params));
      console.log('Upload success', data);
      return path;
    } catch (error) {
      console.error('Upload error', error);
      return false;
    }
  }
}
