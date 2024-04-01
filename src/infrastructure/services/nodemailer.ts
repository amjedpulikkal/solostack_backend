require("dotenv").config();
import nodemailer from "nodemailer"
import { InodeMailer } from "../../usecases/interfaces/services/interface";
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailerEmail,
        pass: process.env.nodemailerPassword
    }
});

import { MailPayload } from "../@types/type";

export class Nodemailer implements InodeMailer {
    async sendOtpToMail(payload: MailPayload): Promise<boolean|Error>{
            const send = await transport.sendMail(payload);
            console.log(send);
            return true;
       
    }
   
}