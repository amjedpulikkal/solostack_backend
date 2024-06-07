import { IReview } from "@entities/Ireview";
import { Imentor } from "@entities/mentor";
import { singUpBody } from "@infrastructure/@types/reqBodey";
import { ResponseObj, file } from "@infrastructure/@types/type";

export interface ImentorUseCases {
    getAllMentors(date:Date): Promise<ResponseObj>
    createMentorAccount(mentor:singUpBody): Promise<ResponseObj> ;
    verifyMentorAccount(email: string, otp: string): Promise<ResponseObj> ;
    login(email: string, password: string): Promise<ResponseObj>;
    updateAvailableTime(mentor: Imentor, date: { date: Date, time: number[] }):  Promise<ResponseObj>;
    getAvailableTime(mentor: Imentor, date: Date,): Promise<ResponseObj>;
    getAllMentorAvailableTime(date:Date,time:number): Promise<ResponseObj>
    getMentorProfile(userName:string): Promise<ResponseObj>;
    updateProfilePhoto(mentor: Imentor, file: file): Promise<ResponseObj>
    storeRequest({data,mentorRVId,user}): Promise<ResponseObj> 
    searchMentor():Promise<ResponseObj>
    acceptRequest({reviewTime,studentID}:{reviewTime:IReview,studentID:string}): Promise<ResponseObj>
}
