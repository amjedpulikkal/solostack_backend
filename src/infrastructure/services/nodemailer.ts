require("dotenv").config();
import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailerEmail,
        pass: process.env.nodemailerPassword
    }

})



export class Nodemailer {
    async sendOtpToMail(payload: {
        from: string
        to: string
        subject: string
        text: string
        html: string
    }): Promise<boolean>{

        try {
            const send = await transport.sendMail(payload)
            console.log(send);
            
            return true
        } catch (error) {

            console.log(error);

            return false
        }




    }

}