require("dotenv").config();
import nodemailer from "nodemailer";
import { InodeMailer } from "../../usecases/interfaces/services/interface";
const transport = nodemailer.createTransport({
    //@ts-ignore
  host: process.env.SMTP_Server,
  port: process.env.SMTP_Server_port,
  auth: {
    user: process.env.nodemailerEmail,
    pass: process.env.nodemailerPassword,
  },
});

import { MailPayload } from "../types/type";

export class Nodemailer implements InodeMailer {
  async sendOtpToMail(payload: MailPayload): Promise<boolean | Error> {
    const send = await transport.sendMail(payload);
    console.log(send);
    return true;
  }
}
