import { IReview as IReviewTime, IReviews } from "@entities/Ireview";
import { ObjectId, dbModel } from "@infrastructure/@types/mongo";

export class ReviewRepository {
  private reviewModel:  typeof dbModel<IReviews>;

  constructor(review:  typeof dbModel<IReviews>) {
    this.reviewModel = review;
  }


  async createNewReview(reviewTime:IReviewTime,studentId:string):Promise<IReviews>{
    const review:IReviews = {
      date:reviewTime.date,
      time:reviewTime.time,
      mentorId:reviewTime.mentorId,
      studentId,
      status:""
    }
    console.log(review)
    return await this.reviewModel.create(review)
  }

  async findTodayReviewWithStudentId(id:string):Promise<IReviews>{
    
    return await this.reviewModel.findOne({studentId:new ObjectId(id)})
  }
}
