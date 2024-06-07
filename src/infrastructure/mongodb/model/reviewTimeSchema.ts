


import mongoose, { Schema, Model } from "mongoose";

import { IReview } from "../../../entities/Ireview";
const reviewSchema = new Schema<IReview>({

    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor' },
    date: { type:Date, required: true },
    time: { type: Number, required: true },
    isBooked: { type: Boolean, required: true,default:false },
    requests: [{ studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' } ,reviewFor:{type:String}}],
    bookedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
})


export const reviewModel: Model<IReview> = mongoose.model<IReview>("reviewTime", reviewSchema)