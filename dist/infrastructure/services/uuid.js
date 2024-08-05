"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
class Uuid {
    generateOTPFromUUID() {
        const uuidValue = (0, uuid_1.v4)();
        const uuidSubstring = uuidValue.substr(0, 8);
        const otpNumber = parseInt(uuidSubstring, 16);
        return otpNumber % 1000000;
    }
}
exports.Uuid = Uuid;
