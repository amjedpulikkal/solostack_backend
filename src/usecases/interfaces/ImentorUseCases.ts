import { singUpBody } from "@infrastructure/@types/reqBodey";
import { ResponseObj } from "@infrastructure/@types/type";

export interface ImentorUseCases {


    createMentorAccount(mentor:singUpBody): Promise<ResponseObj> ;
    verifyMentorAccount(email: string, otp: string): Promise<ResponseObj> ;
    login(email: string, password: string): Promise<ResponseObj>;
    updateAvailableTime(email: string, date: { date: Date, time: number[] }):  Promise<ResponseObj>;
    getAvailableTime(mentor: Imentor, date: Date): Promise<ResponseObj>;
}
