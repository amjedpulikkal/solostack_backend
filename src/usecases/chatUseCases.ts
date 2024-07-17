import { ResponseObj } from "@infrastructure/types/type";
import { IchatGroupUseCase } from "@interfaces/IchatGroupUseCases";
import { IchatGroupRepository } from "@interfaces/repositroey/IchatGroupRepository";
import { IchatMessageRepository } from "@interfaces/repositroey/IchatMessageRepository";
import { IAwsS2, ISharp } from "@interfaces/services/interface";
import { file } from "@infrastructure/types/type";

export class chatGroupUseCases implements IchatGroupUseCase {
  private chatGroupRepo: IchatGroupRepository;
  private chatMessageRepo: IchatMessageRepository;
  private staticFile: IAwsS2;
  private imageResize: ISharp;
  constructor(
    chatGroupRepo: IchatGroupRepository,
    chatMessageRepo: IchatMessageRepository,
    staticFile: IAwsS2,
    sharp: ISharp
  ) {
    this.chatGroupRepo = chatGroupRepo;
    this.chatMessageRepo = chatMessageRepo;
    (this.staticFile = staticFile), (this.imageResize = sharp);
  }

  async getAllChatGroup(): Promise<ResponseObj> {
    const data = await this.chatGroupRepo.getAllGroups();
    console.log(data)
    return { status: 200, data };
  }
  async createNewGroup(name: string, file: file): Promise<ResponseObj> {
    file.buffer = await this.imageResize.resizeImage(file.buffer, 460, 460);
    const image = (await this.staticFile.uploadFile(
      file.buffer,
      file.originalname
    )) as string;
    console.log(image);
    const data = await this.chatGroupRepo.createNewGroup(name, image);
    return { status: 200, data };
  }
  async joinNewGroup({
    id,
    groupID,
  }: {
    id: string;
    groupID: string;
  }): Promise<ResponseObj> {
    const data = await this.chatGroupRepo.joinNewGroup(id, groupID);
    return { status: 200, data };
  }
  async getAllGroupsWithUserId({
    userID,
  }: {
    userID: string;
  }): Promise<ResponseObj> {
    const data = await this.chatGroupRepo.getAllGroupsWithUserIdWithMassages(userID);
      
    return { data, status: 200 };
  }
  async storeMessage({
    groupId,
    senderId,
    message,
    senderTag,
    date
  }: {
    groupId: string;
    senderId: string;
    senderTag: string;
    message: { data: string; type: "image" | "text" | "vide" | "pol" };
    date:Date
  }): Promise<ResponseObj> {
    const endData = await this.chatMessageRepo.storeMessage(
      groupId,
      senderId,
      senderTag,
      message,
      date
    );
    return { status: 200, data: endData };
  }
  async getChatHistory({ groupId }): Promise<ResponseObj> {
    const data = await this.chatMessageRepo.chatHistory(groupId);
    console.log(data);
    return { status: 200, data };
  }
}
