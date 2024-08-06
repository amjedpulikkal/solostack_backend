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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nodemailer = void 0;
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    //@ts-ignore
    host: process.env.SMTP_Server,
    port: process.env.SMTP_Server_port,
    auth: {
        user: process.env.nodemailerEmail,
        pass: process.env.nodemailerPassword,
    },
});
class Nodemailer {
    sendOtpToMail(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const send = yield transport.sendMail(payload);
            console.log(send);
            return true;
        });
    }
}
exports.Nodemailer = Nodemailer;
