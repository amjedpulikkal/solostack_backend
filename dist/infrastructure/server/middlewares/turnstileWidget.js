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
exports.WidgetValidation = WidgetValidation;
function WidgetValidation(req, res, next) {
    console.log("sssss");
    const SECRET_KEY = '0x4AAAAAAAXYCCNApghnukiY8A86ftKNaYI';
    (function handlePost(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            ;
            const ip = req.ip;
            console.log("sssss", token, ip);
            let formData = new FormData();
            formData.append('secret', SECRET_KEY);
            formData.append('response', token);
            formData.append('remoteip', ip);
            const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
            const result = yield fetch(url, {
                body: formData,
                method: 'POST',
            });
            const outcome = yield result.json();
            console.log(outcome);
            if (outcome.success) {
                next();
            }
            else {
                res.status(400).json("your not a human");
            }
        });
    })(req);
}
