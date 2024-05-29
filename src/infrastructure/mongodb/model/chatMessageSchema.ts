

import { IchatGroup,IchatMessage } from "@entities/IchatGroup";
import mongoose, { Schema, Model,InferSchemaType  } from "mongoose";

// chatHistory:{type:[{
//     senderId: { type: mongoose.Schema.Types.ObjectId },
//     senderName:{type:String},
//     type:{type:String,enum:["image" , "text" , "vide" , "pol"]},
//     date:{type:Date,default:new Date()},
//     data:{type:String}
// }],default:[]},

const chatMessageSchema= new Schema<IchatMessage>({
         senderId: { type: mongoose.Schema.Types.ObjectId },
         senderTag:{type:String ,enum:["student" , "mentor"]},
         groupId:{type:mongoose.Schema.Types.ObjectId,ref:'chatGroup'},
         senderName:{type:String},
         message:{data:{type:String}, type:{type:String,enum:["image" , "text" , "vide" , "pol"]},},
         date:{type:Date,default:new Date()},

})

 const chatMessageModel = mongoose.model<IchatMessage>("chatMessage", chatMessageSchema)


 export default chatMessageModel