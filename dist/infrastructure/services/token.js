"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.jwtSecret;
class Token {
    singToken(payload) {
        const payloadObject = {
            _id: payload._id,
            email: payload.email
        };
        const token = jsonwebtoken_1.default.sign(payloadObject, secretKey, { expiresIn: '7d' });
        console.log('Generated JWT:', token);
        return token;
    }
    verifyJwtToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, secretKey);
        }
        catch (error) {
            return false;
        }
    }
}
exports.Token = Token;
