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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeServices = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.stripe_sk);
class StripeServices {
    createPayment(amount, type, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentIntent = yield stripe.paymentIntents.create({
                amount,
                currency: type,
                metadata: {
                    userId
                }
            });
            return paymentIntent;
        });
    }
    webhooks(body, sig) {
        return __awaiter(this, void 0, void 0, function* () {
            const endpointSecret = process.env.stripe_wh;
            try {
                return stripe.webhooks.constructEvent(body, sig, endpointSecret);
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.StripeServices = StripeServices;
