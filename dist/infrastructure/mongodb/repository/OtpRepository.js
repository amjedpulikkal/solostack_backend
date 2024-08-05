"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpRepository = void 0;
class OtpRepository {
    constructor(otpModel) {
        this.otpModel = otpModel;
    }
    createNewOtp(otp_n, author) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(author);
            const Otp = {
                author: {
                    email: author.email,
                    password: author.password,
                    userName: author.userName
                },
                otp: otp_n,
            };
            console.log("-------------");
            console.log(Otp);
            const newOtp = yield this.otpModel.create(Otp);
            return newOtp;
        });
    }
    finedOtpAndDelete(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const Otp = yield this.otpModel.findOneAndDelete({ otp });
            console.log(Otp);
            return Otp ? Otp : false;
        });
    }
    verifyOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("sssss", email);
            const dbOtp = yield this.otpModel.findOne({ "author.email": email });
            console.log(dbOtp);
            console.log(dbOtp.otp, dbOtp.otp === parseInt(otp), otp);
            if ((dbOtp === null || dbOtp === void 0 ? void 0 : dbOtp.otp) === parseInt(otp))
                return dbOtp.author;
            return false;
        });
    }
}
exports.OtpRepository = OtpRepository;
