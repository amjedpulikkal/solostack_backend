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
exports.adminController = void 0;
const error_1 = require("@infrastructure/server/middlewares/error");
class adminController {
    constructor(adminUseCases) {
        this.adminUseCases = adminUseCases;
    }
    signUpAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password);
                const data = yield this.adminUseCases.login(email, password);
                if (data.status === 200)
                    return res.cookie('jwtToken', data === null || data === void 0 ? void 0 : data.token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'strict',
                        maxAge: 604800000,
                        path: '/',
                    }).status(data.status).json(data.data);
                return res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
}
exports.adminController = adminController;
