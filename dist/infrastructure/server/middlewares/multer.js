"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToBuffer = uploadFileToBuffer;
const multer_1 = __importDefault(require("multer"));
function uploadFileToBuffer(req, res, next) {
    const storage = multer_1.default.memoryStorage();
    const upload = (0, multer_1.default)({ storage: storage }).single('image');
    upload(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            return res.status(400).send('Error uploading file: ' + err.message);
        }
        else if (err) {
            return res.status(500).send('Error uploading file: ' + err.message);
        }
        next();
    });
}
