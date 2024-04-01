
import Istudent from "../../entities/student"
import { singUpBody } from "../../infrastructure/@types/reqBodey";
import { ResponseObj } from "../../infrastructure/@types/type";
export interface IstudenUsecases{
    isOauth(token:string):Promise<Istudent|boolean>
    createStudentAccount(user:singUpBody): Promise<number>;
    verifyStudentAccount(email:string,otp:string):Promise<string|number>;
    oauthSuccuss(user:Istudent):Promise<string>
    login(email: string, password: string):Promise<ResponseObj> 
    forgetPassword(email: string):Promise<ResponseObj>
    verifyForgetPassword(token: string, password: string): Promise<ResponseObj> 
    
}