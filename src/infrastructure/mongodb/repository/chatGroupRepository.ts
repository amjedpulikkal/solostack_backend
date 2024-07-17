import { IchatGroup } from "@entities/IchatGroup";
import chatGroupModel from "../model/chatGroupSchema";
import { IchatGroupRepository } from "@interfaces/repositroey/IchatGroupRepository";
import mongoose from "mongoose";

export class chatGroupRepo implements IchatGroupRepository {
  async getAllGroups(): Promise<IchatGroup[]> {
    return await chatGroupModel.find({});
  }

  async createNewGroup(name: string, image: string): Promise<IchatGroup> {
    return chatGroupModel.create({
      groupName: name,
      image,
    });
  }

  async joinNewGroup(userID: string, groupID: string): Promise<IchatGroup> {
    return await chatGroupModel.findByIdAndUpdate(groupID, {
      $push: { subscripts: { subscribers: userID } },
    });
  }
  async getAllGroupsWithUserId(userID: string): Promise<IchatGroup[]> {
    console.log("--------------", userID);
    console.log(new mongoose.Types.ObjectId(userID), "------");
    return await chatGroupModel.find({
      "subscripts.subscribers": new mongoose.Types.ObjectId(userID),
    });
  }

  async storeChat(
    groupID: string,
    data: { senderId: string; senderName: String; type: String; data: String }
  ) {
    return await chatGroupModel.findByIdAndUpdate(groupID, {
      $push: { chatHistory: data },
    });
  }
  async getAllGroupsWithUserIdWithMassages(
    userID: string
  ): Promise<IchatGroup[]> {
    return await chatGroupModel.aggregate([
      {
        $match: {
          "subscripts.subscribers": new mongoose.Types.ObjectId(userID),
        },
      },
      {
        $lookup: {
          from: "chatmessages",
          localField: "_id",
          foreignField: "groupId",
          as: "messages",
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "messages.senderId",
          foreignField: "_id",
          as: "studentData",
        },
      
      },
      {
        $lookup: {
          from: "students",
          localField: "subscripts.subscribers",
          foreignField: "_id",
          as: "subscriptsUsers",
        },
      
      },
      {
        $addFields: {
          "messages.senderData": {
            $arrayElemAt: ["$studentData", 0]
          }
        }
      }  
    ]);
  }
}
