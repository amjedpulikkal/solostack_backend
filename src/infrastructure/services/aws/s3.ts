

import AWS from "aws-sdk"

AWS.config.update({
    region:"eu-north-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const s3 = new AWS.S3();
export class AwsS3 {


    getRandomFileName(type: string): string {
        return `${new Date().getTime()}_${Math.random()}.${type}`;
    }
    async uploadFile(file: Buffer, type: string): Promise<string | boolean> {
        try {

            const path = this.getRandomFileName(type)
            const params = {
                Bucket: process.env.AWS_BUCKET,
                Key: path,
                Body: file,
                
            };

            const data = await s3.upload(params).promise()

            console.log(data)
            return path
        } catch (error) {
            console.error(error)
            return  false
        }



    }

}