import { DbObjectIdType } from "@infrastructure/@types/mongo";

export interface IchatGroup {
  _id?:string
  groupName: string;
  image:String
  subscripts: [
    {
      subscribers: string;
    }
  ];
  chatHistory: [
    {
      senderId: DbObjectIdType;
      senderName: String;
      type: String;
      date: Date;
      data: String;
    }
  ];
  startedDate: Date;
  isFreezed: Boolean;
}

export interface IchatMessage {
  _id?:string
  senderId: DbObjectIdType;
  groupId:DbObjectIdType;
  senderTag:"student"|"mentor"|"Tutor"
  senderName: String;
  type: String;
  date: Date;
  message: {
    type:"image" |"text" | "vide" | "pol"
    data:string,

  };
}
