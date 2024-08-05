import { IPaymentHistory } from "@entities/paymentHistory"
import { UpdateWriteOpResult } from "mongoose"

export interface IPaymentHistoryRepository{
     InsertNewDoc(data: IPaymentHistory):Promise<IPaymentHistory>
     updateStatus(stripePaymentIntentId:string, status:'pending'| 'succeeded'|'failed'):Promise<UpdateWriteOpResult> 
     isSucceeded(stripePaymentIntentId:string):Promise<IPaymentHistory>
}