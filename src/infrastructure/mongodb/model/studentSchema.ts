import Istudet from "../../../entities/student"

import mongoose ,{ Schema ,Model     } from "mongoose"; 
const studentSchema = new Schema<Istudet>({
    email: {type: String,unique:true},
    password: {type: String,default:""},
    personal_info: {
        userName:{type: String,default:""},
        name: {type: String ,default:""},
        bio: {type: String ,default:""},
        photo: {type: String ,default:"https://lionrocker.com.au/wp-content/uploads/2022/04/placeholder-img.jpg"},
    },
    social_links:{
        linkedin:{type: String,default:""},
    },
    account_info:{
        learningGoals: {type: String,default:""},
        completedSessions:[Schema.Types.ObjectId],
        reviews: [Schema.Types.ObjectId],
        skillLevel: {type:String,enum:["Newcomer" , "Developing" , "Proficient" , "Master"]},
    },
    wallet:{type: Number,default:0 },
    joinedAt: { type: Date, default: Date.now},
    isBlocked: {type: Boolean},

})

const studentModel: Model<Istudet> = mongoose.model<Istudet>('Student', studentSchema)

export default studentModel
