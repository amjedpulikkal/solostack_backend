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
exports.TurnStunServer = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv").config();
class TurnStunServer {
    getIceServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                format: "urls",
            };
            const options = {
                method: "PUT",
                url: "https://global.xirsys.net/_turn/MyFirstApp",
                headers: {
                    Authorization: "Basic " +
                        Buffer.from(`${process.env.ice_servers_token}`).toString("base64"),
                    "Content-Type": "application/json",
                },
                data: data,
            };
            try {
                const response = yield (0, axios_1.default)(options);
                console.log(response.data);
                return response.data;
            }
            catch (error) {
                console.error("Error fetching ICE servers:", error.message || error);
                // return "Error fetching ICE servers"; 
            }
        });
    }
}
exports.TurnStunServer = TurnStunServer;
