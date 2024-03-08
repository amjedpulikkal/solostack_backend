
import {IOtp} from "../../../entities/otp"
export interface Iotprepository {


    createNewOtp(otp_n:number,author:{email:string,password:string}):Promise<IOtp>;
    finedOtpAndDelete(otp:Number):Promise<IOtp|false>

}