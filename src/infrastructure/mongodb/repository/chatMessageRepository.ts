import { IchatMessage } from "@entities/IchatGroup";
import chatMessageModel from "../model/chatMessageSchema";
import { IchatMessageRepository } from "@interfaces/repositroey/IchatMessageRepository";
import  mongoose  from "mongoose";

export class chatMessageRepository implements IchatMessageRepository {
  async storeMessage(groupID: string, senderId: string,senderTag:string, message:{data:string,type:"image" | "text" | "vide" | "pol"},date:Date):Promise<IchatMessage>{
    console.log("---senderTag",senderTag)
    return await chatMessageModel.create({
      message,
      groupId: groupID,
      senderId,
      senderTag,
      date
    });
  }
  async chatHistory(groupID:string):Promise<IchatMessage>{
    console.log(new mongoose.Types.ObjectId(groupID),)
    return (await chatMessageModel.find({ groupId: new mongoose.Types.ObjectId(groupID) })).reverse() as unknown as IchatMessage
  }
}
