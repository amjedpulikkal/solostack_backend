import { IReview as IReviewTime, IReviews } from "@entities/Ireview";
import { ObjectId, dbModel } from "../../types/mongo";
import { IreviewRepository } from "@interfaces/repositroey/IreviewRepository"

export class ReviewRepository implements IreviewRepository {
  private reviewModel:  typeof dbModel<IReviews>;

  constructor(review:  typeof dbModel<IReviews>) {
    this.reviewModel = review;
  }


  async createNewReview(reviewTime:IReviewTime,studentId:string):Promise<IReviews>{
    const review:IReviews = {
      date: reviewTime.date,
      time:reviewTime.time,
      mentorId:reviewTime.mentorId,
      studentId,
      
    }
    console.log(review)
    return await this.reviewModel.create(review)
  }

  async findTodayReviewWithStudentId(id:string):Promise<IReviews>{

    const data = await this.reviewModel.find({studentId:new ObjectId(id),status:"pending",date:new Date((new Date()).toDateString())}).populate("mentorId")

    return data[data.length-1] as IReviews
  }
}
