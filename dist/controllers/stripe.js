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
exports.StripeController = void 0;
class StripeController {
    constructor(stripeUseCases) {
        this.stripeUseCases = stripeUseCases;
    }
    webHock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.stripeUseCases.webhooks(req.body, req);
            res.status(data.status).json(data);
        });
    }
    createPaymentIntent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const data = yield this.stripeUseCases.createPaymentIntent(Object.assign(Object.assign({}, req.body), req.user));
            console.log(data);
            res.status(data.status).json(data);
        });
    }
    isSucceeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.stripeUseCases.isSucceeded(req.body);
            console.log(data);
            res.status(data.status).json(data);
        });
    }
}
exports.StripeController = StripeController;
