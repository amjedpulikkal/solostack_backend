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
exports.chatGroupRepo = void 0;
const chatGroupSchema_1 = __importDefault(require("../model/chatGroupSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
class chatGroupRepo {
    getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chatGroupSchema_1.default.find({});
        });
    }
    createNewGroup(name, image) {
        return __awaiter(this, void 0, void 0, function* () {
            return chatGroupSchema_1.default.create({
                groupName: name,
                image,
            });
        });
    }
    joinNewGroup(userID, groupID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chatGroupSchema_1.default.findByIdAndUpdate(groupID, {
                $push: { subscripts: { subscribers: userID } },
            });
        });
    }
    getAllGroupsWithUserId(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("--------------", userID);
            console.log(new mongoose_1.default.Types.ObjectId(userID), "------");
            return yield chatGroupSchema_1.default.find({
                "subscripts.subscribers": new mongoose_1.default.Types.ObjectId(userID),
            });
        });
    }
    storeChat(groupID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chatGroupSchema_1.default.findByIdAndUpdate(groupID, {
                $push: { chatHistory: data },
            });
        });
    }
    getAllGroupsWithUserIdWithMassages(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield chatGroupSchema_1.default.aggregate([
                {
                    $match: {
                        "subscripts.subscribers": new mongoose_1.default.Types.ObjectId(userID),
                    },
                },
                {
                    $lookup: {
                        from: "chatmessages",
                        localField: "_id",
                        foreignField: "groupId",
                        as: "messages",
                    },
                },
                {
                    $lookup: {
                        from: "students",
                        localField: "messages.senderId",
                        foreignField: "_id",
                        as: "studentData",
                    },
                },
                {
                    $lookup: {
                        from: "students",
                        localField: "subscripts.subscribers",
                        foreignField: "_id",
                        as: "subscriptsUsers",
                    },
                },
                {
                    $addFields: {
                        "messages.senderData": {
                            $arrayElemAt: ["$studentData", 0]
                        }
                    }
                }
            ]);
        });
    }
}
exports.chatGroupRepo = chatGroupRepo;
