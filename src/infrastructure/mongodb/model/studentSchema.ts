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
// const studentSchema = new Schema<Istudet>({
//     personal_info: {
//         userName:{type: String, required: true},
//         name: {type: String, required: true},
//         email: {type: String, required: true},
//         age: { type: Number, min: 13, max: 70 },
//         password: {type: String, required: true},
//         bio: {type: String },
//         photo: {type: String ,default:""},
//     },
//     social_links:{
//         linkedin:{type: String},
//     },
//     account_info:{
//         learningGoals: {type: String, required: true},
//         completedSessions:[Schema.Types.ObjectId],
//         reviews: [Schema.Types.ObjectId],
//         skillLevel: {type:String,enum:["Newcomer" , "Developing" , "Proficient" , "Master"],required:true},
//     },
//     wallet:{type: Number,default:0 },
//     joinedAt: { type: Date, default: Date.now},
//     isBlocked: {type: Boolean,default:true},

// })


const studentModel: Model<Istudet> = mongoose.model<Istudet>('Student', studentSchema)

export default studentModel
