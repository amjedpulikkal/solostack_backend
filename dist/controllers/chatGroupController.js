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
exports.chatGroup = void 0;
const error_1 = require("../infrastructure/server/middlewares/error");
class chatGroup {
    constructor(chatGroupUseCases) {
        this.chatGroupUseCases = chatGroupUseCases;
    }
    createNewGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("group", req.body);
                console.log(req.file);
                const { groupName } = req.body;
                const data = yield this.chatGroupUseCases.createNewGroup(groupName, req.file);
                return res.status(data.status).json(data);
            }
            catch (error) {
                console.log(error, "----------------");
                next(new error_1.ErrorHandler(error));
            }
        });
    }
    joinNewGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // req.body.id = req.user?.id as string
                console.log(req.body);
                const data = yield this.chatGroupUseCases.joinNewGroup(req.body);
                return res.status(data.status).json(data);
            }
            catch (error) {
                next(new error_1.ErrorHandler(error));
            }
        });
    }
    getAllGroupWithID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.chatGroupUseCases.getAllGroupsWithUserId(req.body);
                return res.status(data.status).json(data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler(error));
            }
        });
    }
    getAllGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.chatGroupUseCases.getAllChatGroup();
                return res.status(data.status).json(data);
            }
            catch (error) {
                next(new error_1.ErrorHandler(error));
            }
        });
    }
    getChatHistory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.chatGroupUseCases.getChatHistory(req.body);
                return res.status(data.status).json(data);
            }
            catch (error) {
                next(new error_1.ErrorHandler(error));
            }
        });
    }
}
exports.chatGroup = chatGroup;
