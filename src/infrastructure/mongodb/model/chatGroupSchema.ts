import { IchatGroup } from "@entities/IchatGroup";
import mongoose, { Schema, Model,InferSchemaType  } from "mongoose";

// chatHistory:{type:[{
//     senderId: { type: mongoose.Schema.Types.ObjectId },
//     senderName:{type:String},
//     type:{type:String,enum:["image" , "text" , "vide" , "pol"]},
//     date:{type:Date,default:new Date()},
//     data:{type:String}
// }],default:[]},

const chatGroupSchema= new Schema<IchatGroup>({

    groupName: { type: String, unique: true ,required:true},
    image:{type:String},
    subscripts:{type:[{
        subscribers: { type: mongoose.Schema.Types.ObjectId }
    }],default:[]},
    startedDate:{type:Date,default:new Date()},
    isFreezed: { type: Boolean, default: false }

})

 const chatGroupModel = mongoose.model<IchatGroup>("chatGroup", chatGroupSchema)


 export default chatGroupModel