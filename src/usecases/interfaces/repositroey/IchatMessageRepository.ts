import { IchatMessage } from "@entities/IchatGroup";

export interface IchatMessageRepository {

    storeMessage(groupID: string, senderId: string,senderTag:string, message:{data:string,type:"image" | "text" | "vide" | "pol"},date:Date):Promise<IchatMessage>
    chatHistory(groupID:string,):Promise<IchatMessage>
}