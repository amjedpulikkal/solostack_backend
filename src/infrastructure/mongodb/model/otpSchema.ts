


import mongoose ,{ Schema ,Model     } from "mongoose"; 

import { IOtp } from "../../../entities/otp";
const otpSchema = new Schema<IOtp>({
    author:{
        email:{type:String,required:true},
        name:{type:String},
        password:{type:String,required:true},
    },
    otp:{
        type:Number,
        required:true,
        
    },
    ex:{ type: Date, default: Date.now,expires: 300}
})


export const OtpModel : Model<IOtp> = mongoose.model<IOtp>("otp",otpSchema)