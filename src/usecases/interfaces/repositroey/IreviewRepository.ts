import { IReview, IReviews } from "@entities/Ireview";
// import { DbObjectIdType } from "@types/mongo";
import { DbObjectIdType } from "../../../infrastructure/types/mongo";




export interface IreviewTimeRepository{

    createNewReview(date: Date, time: number|number[], mentorId: string):Promise<IReview | IReview[]>
    getAvailableTime(_id:string, date:Date,):Promise<IReview[]>
    getAllMentorAvailableTime( date: Date,time:number): Promise<IReview[]>
    getAllMentorsWithDate(data:Date)
    storeRequest(data:string ,mentorRvId:string ,id:string,):Promise<IReview>
    updateReviewTime (reviewId:string|DbObjectIdType,id:string|DbObjectIdType):Promise<IReview>
}




export interface IreviewRepository{
    createNewReview(reviewTime:IReview,studentId:string):Promise<IReviews>
    findTodayReviewWithStudentId(id:string):Promise<IReviews>
    findTodayReviewWithMentorId(id:string):Promise<IReviews>
    // createNewReview(date: Date, time: number|number[], mentorId: string):Promise<IReview | IReview[]>
    // getAvailableTime(_id:string, date:Date,):Promise<IReview[]>
    // getAllMentorAvailableTime( date: Date,time:number): Promise<IReview[]>
    // getAllMentorsWithDate(data:Date)
    // storeRequest(data:string ,mentorRvId:string ,id:string,):Promise<IReview>
}