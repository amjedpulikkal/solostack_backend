import { ResponseObj } from "@infrastructure/types/type";
import { IadminUseCases } from "@interfaces/IadminUseCases";
import { IAdminRepo } from "@interfaces/repositroey/IadminRepository";
import { Itoken } from "@interfaces/services/interface";

export class AdminUseCases implements IadminUseCases {
  adminRepo: IAdminRepo;
  token: Itoken;

  constructor(adminRepo: IAdminRepo, token: Itoken) {
    this.adminRepo = adminRepo;
    this.token = token;
  }

  async login({ email, password }: { email: string; password: string }):Promise<ResponseObj> {
    const data = await this.adminRepo.loginadmin(email, password);

    console.log("dataff=--",data);
    // if data than do
    if(!data)
      return {data:"",status:404,}
    
    const token = this.token.singToken({email:data.email,_id:data._id,admin:true})


    return {data:email,status:200,token}
  }
}
