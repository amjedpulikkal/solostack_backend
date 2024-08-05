import mongoose from "mongoose";

export interface IPaymentHistory  {
    userId: mongoose.Types.ObjectId| string;
    amount: number;
    currency: string;
    status: 'pending'| 'succeeded'|'failed'
    paymentMethod: string;
    description: string;
    stripePaymentIntentId: string;
    createdAt?: Date;
    updatedAt?: Date;
  }