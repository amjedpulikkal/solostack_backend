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
exports.chatGroupUseCases = void 0;
class chatGroupUseCases {
    constructor(chatGroupRepo, chatMessageRepo, staticFile, sharp) {
        this.chatGroupRepo = chatGroupRepo;
        this.chatMessageRepo = chatMessageRepo;
        (this.staticFile = staticFile), (this.imageResize = sharp);
    }
    getAllChatGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.chatGroupRepo.getAllGroups();
            console.log(data);
            return { status: 200, data };
        });
    }
    createNewGroup(name, file) {
        return __awaiter(this, void 0, void 0, function* () {
            file.buffer = yield this.imageResize.resizeImage(file.buffer, 460, 460);
            const image = (yield this.staticFile.uploadFile(file.buffer, file.originalname));
            console.log(image);
            const data = yield this.chatGroupRepo.createNewGroup(name, image);
            return { status: 200, data };
        });
    }
    joinNewGroup(_a) {
        return __awaiter(this, arguments, void 0, function* ({ id, groupID, }) {
            const data = yield this.chatGroupRepo.joinNewGroup(id, groupID);
            return { status: 200, data };
        });
    }
    getAllGroupsWithUserId(_a) {
        return __awaiter(this, arguments, void 0, function* ({ userID, }) {
            const data = yield this.chatGroupRepo.getAllGroupsWithUserIdWithMassages(userID);
            return { data, status: 200 };
        });
    }
    storeMessage(_a) {
        return __awaiter(this, arguments, void 0, function* ({ groupId, senderId, message, senderTag, date }) {
            const endData = yield this.chatMessageRepo.storeMessage(groupId, senderId, senderTag, message, date);
            return { status: 200, data: endData };
        });
    }
    getChatHistory(_a) {
        return __awaiter(this, arguments, void 0, function* ({ groupId }) {
            const data = yield this.chatMessageRepo.chatHistory(groupId);
            console.log(data);
            return { status: 200, data };
        });
    }
}
exports.chatGroupUseCases = chatGroupUseCases;
