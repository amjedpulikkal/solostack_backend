


import mongoose, { Schema, Model } from "mongoose";

import { IReviews } from "../../../entities/Ireview";
// const reviewSchema = new Schema<IReviews>({

//     mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor' },
//     studentId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
//     date: { type:Date, required: true },
//     time: { type: Number, required: true },
//     status: { type: String,  }
// })

const reviewSchema = new Schema<IReviews>({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'mentor', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    date: { type: Date, required: true },
    time: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  }, {
    timestamps: true
  });

export const reviewModel: Model<IReviews> = mongoose.model<IReviews>("Review", reviewSchema)