import { ResponseObj } from "@infrastructure/types/type";

export interface IadminUseCases{
     login({ email, password, }: { email: string; password: string,}):Promise<ResponseObj> 
}