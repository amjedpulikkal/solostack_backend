
import { dbModel, DbObjectIdType } from "@infrastructure/@types/mongo"
import { IReview } from "@entities/Ireview"

import { IreviewRepository } from "@interfaces/repositroey/IreviewRepository"
import { ObjectId } from "../model/mentorSchema"
export class ReviewRepository implements IreviewRepository {

    private reviewModel: typeof dbModel<IReview>
    constructor(reviewModel: typeof dbModel<IReview>) {

        this.reviewModel = reviewModel
    }


    async createNewReview(date: Date, time: number | number[], mentorId: string): Promise<IReview | IReview[]> {

        console.log("------date------->", date)
        if (Array.isArray(time)) {

            const promises = time.map(async (t) => {
                const filter = { mentorId, date, time: t };
                const update = { mentorId, date, time: t };
                const options = { upsert: true, new: true };
                return await this.reviewModel.findOneAndUpdate(filter, update, options).exec();
            });

            const results = await Promise.all<IReview>(promises);
            console.table(results)
            return results;
        }

        const filter = { mentorId, date, time };
        const update = { mentorId, date, time };
        const options = { upsert: true, new: true };
        return await this.reviewModel.findOneAndUpdate(filter, update, options).exec();
    }
    
    async getAvailableTime(_id: string, date: Date): Promise<IReview[]> {
        console.log(date,"===============",new ObjectId(_id))
        return await this.reviewModel.find({mentorId: new ObjectId(_id),date:new Date(date)}).populate("requests.studentId") as IReview[]

    }
    async getAllMentorAvailableTime(date: Date,time:number): Promise<IReview[]> {
        console.log(date,"===============",time)
        return await this.reviewModel.find({date:new Date(date),time,isBooked:false}).populate("mentorId") as IReview[]
    }
    async     getAllMentorsWithDate(date:Date){
        return await this.reviewModel.find({date:new Date(date)}).populate("mentorId")
    }


    async storeRequest(data:string ,mentorRvId:string ,id:string,):Promise<IReview>{
        console.log(data,"data",mentorRvId,id)
         return await this.reviewModel.findByIdAndUpdate(mentorRvId,{$push:{requests:{studentId:id,reviewFor:data}}})

    }
 async updateReviewTime (reviewId:string,id:string):Promise<IReview> {
    return await this.reviewModel.findByIdAndUpdate(id,{$set:{bookedId:reviewId,isBooked:true}})
    
 }

}