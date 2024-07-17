import { ResponseObj } from "@infrastructure/types/type"

import { file } from "@infrastructure/types/type";

export  interface IchatGroupUseCase{
    getAllChatGroup(): Promise<ResponseObj>
    createNewGroup(name: string, file: file):Promise<ResponseObj> 
    joinNewGroup({id,groupID}:{id:string,groupID:string}):Promise<ResponseObj>
    getAllGroupsWithUserId({userID}:{userID:string}):Promise<ResponseObj>
    storeMessage({groupId,senderId,message,senderTag,date}:{groupId:string,senderId:string,senderTag:string,message:{data:string,type:"image" | "text" | "vide" | "pol"},date:Date}):Promise<ResponseObj>,
    getChatHistory({groupId}):Promise<ResponseObj>
}