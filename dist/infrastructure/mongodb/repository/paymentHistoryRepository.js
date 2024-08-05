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
exports.PaymentHistoryRepository = void 0;
class PaymentHistoryRepository {
    constructor(paymentHistory) {
        this.paymentHistory = paymentHistory;
    }
    InsertNewDoc(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentHistory.create(data);
        });
    }
    updateStatus(stripePaymentIntentId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentHistory.updateOne({ stripePaymentIntentId }, { status });
        });
    }
    isSucceeded(stripePaymentIntentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentHistory.findOne({ stripePaymentIntentId, status: "succeeded" });
        });
    }
}
exports.PaymentHistoryRepository = PaymentHistoryRepository;
