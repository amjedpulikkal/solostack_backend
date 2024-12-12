import { IAdminRepo } from "@interfaces/repositroey/IadminRepository";
import adminModel from "../model/adminSchema";

export class AdminRepo implements IAdminRepo {
  async loginadmin(email: string, password: string) {
   return await adminModel.findOne({email,password})
  }
}
