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
exports.StripeUseCases = void 0;
class StripeUseCases {
    constructor(stripe, paymentHistory, studentRepo, exchangeRate, turnStunServer) {
        this.stripe = stripe;
        this.paymentHistory = paymentHistory;
        this.exchangeRate = exchangeRate;
        this.studentRepo = studentRepo;
        this.turnStunServer = turnStunServer;
    }
    createPaymentIntent(_a) {
        return __awaiter(this, arguments, void 0, function* ({ amount, type = "usd", _id, }) {
            console.log(amount, _id);
            const paymentIntent = yield this.stripe.createPayment(amount, type, _id);
            return { data: paymentIntent, status: 200 };
        });
    }
    webhooks(body, req) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const sig = req.headers["stripe-signature"];
            const event = yield this.stripe.webhooks(body, sig);
            if (!(event instanceof Error)) {
                switch (event.type) {
                    case "payment_intent.succeeded":
                        const paymentIntent = event.data.object;
                        this.paymentHistory.updateStatus(paymentIntent.id, "succeeded");
                        console.log(`PaymentIntent was successful for amount ${(paymentIntent.amount, event.data.object)}`);
                        if (paymentIntent.currency === "inr") {
                            paymentIntent.amount = yield this.exchangeRate.convertInrToUsd(paymentIntent.amount / 100);
                            console.log(paymentIntent.amount, "---------------");
                        }
                        else {
                            paymentIntent.amount = paymentIntent.amount / 100;
                        }
                        this.studentRepo.ingressWallet(paymentIntent.metadata.userId, paymentIntent.amount);
                        console.log(paymentIntent);
                        break;
                    case "payment_intent.payment_failed":
                        const paymentFailedIntent = event.data.object;
                        this.paymentHistory.updateStatus(paymentFailedIntent.id, "failed");
                        console.log(`PaymentIntent failed: ${(_a = paymentFailedIntent.last_payment_error) === null || _a === void 0 ? void 0 : _a.message}`);
                        break;
                    case "payment_intent.created":
                        const paymentCreatedIntent = event.data.object;
                        console.log(paymentCreatedIntent);
                        this.paymentHistory.InsertNewDoc({
                            userId: paymentCreatedIntent.metadata.userId,
                            amount: paymentCreatedIntent.amount / 100,
                            currency: paymentCreatedIntent.currency,
                            status: "pending",
                            paymentMethod: "",
                            description: "",
                            stripePaymentIntentId: paymentCreatedIntent.id,
                        });
                        break;
                    default:
                        console.log(`Unhandled event type ${event.type}`);
                }
            }
            return { data: null, status: 200 };
        });
    }
    isSucceeded(_a) {
        return __awaiter(this, arguments, void 0, function* ({ stripePaymentIntentId }) {
            const isSucceeded = yield this.paymentHistory.isSucceeded(stripePaymentIntentId);
            if (isSucceeded) {
                return { data: isSucceeded, status: 200 };
            }
            else {
                return { data: isSucceeded, status: 404 };
            }
        });
    }
    turn_and_stun_server() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.turnStunServer.getIceServer();
            return { status: 200, data };
        });
    }
}
exports.StripeUseCases = StripeUseCases;
