import mongoose, { Schema, Model,InferSchemaType  } from "mongoose";

import { Imentor } from "@entities/mentor";
const mentorSchema = new Schema<Imentor>({
    email: { type: String, unique: true },
    password: { type: String, default: "" },
    personal_info: {
        userName: { type: String, default: "" },
        name: { type: String, default: "" },
        bio: { type: String, default: "" },
        photo: { type: String, default: "https://lionrocker.com.au/wp-content/uploads/2022/04/placeholder-img.jpg" },
        skills: { type: [], default: "" },
        Communication: { type: [String], default: "" },
    },
    social_links: {
        linkedin: { type: String, default: "" },
    },
    account_info: {
        PreferredMeetingDuration: { type: Number, default: "" },
        Ratings:{type:[]},
        YearsOfExperience:{type:Number},
        Availability:[{
            date:Date,
            time:[Number]
        }],
        Review:{type:[]},
    },
    wallet: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean },

})

type mentor = InferSchemaType<typeof mentorSchema>;


export const ObjectId = mongoose.Types.ObjectId
const mentorModel: Model<Imentor> = mongoose.model<Imentor>('mentor', mentorSchema)

export default mentorModel




