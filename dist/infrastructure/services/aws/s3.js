"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield s3.send(new client_s3_1.ListBucketsCommand({}));
        console.log('Success', data.Buckets);
    }
    catch (err) {
        console.log('Error', err);
    }
});
run();
class AwsS3 {
    getRandomFileName(type) {
        return `${new Date().getTime()}_${Math.random()}.${type}`;
    }
    uploadFile(file, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const path = this.getRandomFileName(type);
                const params = {
                    Bucket: process.env.AWS_BUCKET,
                    Key: path,
                    Body: file,
                };
                const data = yield s3.send(new client_s3_1.PutObjectCommand(params));
                console.log('Upload success', data);
                return path;
            }
            catch (error) {
                console.error('Upload error', error);
                return false;
            }
        });
    }
}
exports.AwsS3 = AwsS3;
