import { IPaymentHistory } from "@entities/paymentHistory";
import { dbModel } from "@infrastructure/types/mongo";
import { IPaymentHistoryRepository } from "@interfaces/repositroey/IpaymentHistoryRepository";
import { UpdateWriteOpResult } from "mongoose";

export class PaymentHistoryRepository  implements IPaymentHistoryRepository {
  private paymentHistory: typeof dbModel<IPaymentHistory>;
  constructor(paymentHistory: typeof dbModel<IPaymentHistory>) {
    this.paymentHistory = paymentHistory;
  }

  async InsertNewDoc(data: IPaymentHistory):Promise<IPaymentHistory>{
    return this.paymentHistory.create(data);
  }

  async updateStatus(stripePaymentIntentId:string, status:'pending'| 'succeeded'|'failed'):Promise<UpdateWriteOpResult> {
    return this.paymentHistory.updateOne({ stripePaymentIntentId }, { status });
  }
  async isSucceeded(stripePaymentIntentId:string):Promise<IPaymentHistory>{
    return this.paymentHistory.findOne({stripePaymentIntentId,status:"succeeded"})
  }
}
