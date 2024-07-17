
import {IOtp} from "../../../entities/otp"

import { singUpBody } from "@infrastructure/types/reqBodey";
export interface Iotprepository {
    
    createNewOtp(otp_n:number,author:{email:string,password?:string,userName?:string}):Promise<IOtp>;
    finedOtpAndDelete(otp:Number):Promise<IOtp|false>
    verifyOtp(email:string,otp:string):Promise<singUpBody|false>

}