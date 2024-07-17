import { IchatGroupUseCase } from "@interfaces/IchatGroupUseCases";
import { req, res, next } from "../infrastructure/types/serverTypes";
import { ErrorHandler } from "../infrastructure/server/middlewares/error";

export class chatGroup {
  private chatGroupUseCases: IchatGroupUseCase;
  constructor(chatGroupUseCases: IchatGroupUseCase) {
    this.chatGroupUseCases = chatGroupUseCases;
  }

  async createNewGroup(req: req, res: res, next: next) {
    try {
      console.log("group", req.body);
      console.log(req.file)
      const { groupName } = req.body;
      const data = await this.chatGroupUseCases.createNewGroup(groupName,req.file);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error, "----------------");

      next(new ErrorHandler(error));
    }
  }

  async joinNewGroup(req: req, res: res, next: next) {
    try {
      // req.body.id = req.user?.id as string
      console.log(req.body)
      const data = await this.chatGroupUseCases.joinNewGroup(req.body,);
      return res.status(data.status).json(data);
    } catch (error) {
      next(new ErrorHandler(error));
    }
  }
  async getAllGroupWithID(req: req, res: res, next: next) {
    try {
      console.log(req.body);
      const data = await this.chatGroupUseCases.getAllGroupsWithUserId(req.body);
      return res.status(data.status).json(data);
    } catch (error) {
      console.log(error)
      next(new ErrorHandler(error));
    }
  }

  async getAllGroups(req: req, res: res, next: next) {
    try {
      const data = await this.chatGroupUseCases.getAllChatGroup();
      return res.status(data.status).json(data);
    } catch (error) {
      next(new ErrorHandler(error));
    }
  }
  async getChatHistory(req: req, res: res, next: next) {
    try {
      console.log(req.body)
      const data = await this.chatGroupUseCases.getChatHistory(req.body);
      return res.status(data.status).json(data);
    } catch (error) {
      next(new ErrorHandler(error));
    }
  }
}
