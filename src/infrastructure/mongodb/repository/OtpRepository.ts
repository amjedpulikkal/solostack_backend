
import { IOtp } from "../../../entities/otp"
import { dbModel } from "../../@types/mongo"
import { singUpBody } from "../../@types/reqBodey"
import { Iotprepository } from "../../../usecases/interfaces/repositroey/IOtRepository"
export class OtpRepository implements Iotprepository {

    private otpModel: typeof dbModel<IOtp>
    constructor(otpModel: typeof dbModel<IOtp>) {

        this.otpModel = otpModel
    }

    async createNewOtp(otp_n: number, author: { email: string, password?: string }): Promise<IOtp> {
        console.log(author);

        const Otp: IOtp = {
            author: {
                email: author.email,
                password: author.password!
            },
            otp: otp_n,
        }
        console.log("-------------")
        const newOtp = await this.otpModel.create(Otp)

        return newOtp
    }


    async finedOtpAndDelete(otp: Number): Promise<IOtp | false> {
        const Otp = await this.otpModel.findOneAndDelete({ otp })
        console.log(Otp)
        return Otp ? Otp : false
    }
    async verifyOtp(email: string, otp: string): Promise<singUpBody | false> {

        console.log("sssss", email);
        const dbOtp = await this.otpModel.findOne({ "author.email": email }) as unknown as IOtp
        console.log(dbOtp);
        console.log(dbOtp.otp,dbOtp.otp===parseInt(otp),otp)
        if (dbOtp?.otp === parseInt(otp))
            return dbOtp.author
        return false






    }






}