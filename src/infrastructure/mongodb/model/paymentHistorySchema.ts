


import mongoose ,{ Schema 
    
} from "mongoose"; 

import { IPaymentHistory } from "../../../entities/paymentHistory";
const PaymentHistorySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'usd' },
    status: { type: String, required: true, enum: ['pending', 'succeeded', 'failed'] },
    paymentMethod: { type: String },
    description: { type: String },
    stripePaymentIntentId: { type: String, required: true, unique: true },
  }, {
    timestamps: true 
  });


export default mongoose.model<IPaymentHistory>('PaymentHistory', PaymentHistorySchema);