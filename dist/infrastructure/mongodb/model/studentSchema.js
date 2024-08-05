"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const studentSchema = new mongoose_1.Schema({
    email: { type: String, unique: true },
    password: { type: String, default: "" },
    personal_info: {
        userName: { type: String, default: "" },
        name: { type: String, default: "" },
        bio: { type: String, default: "" },
        photo: { type: String, default: "https://lionrocker.com.au/wp-content/uploads/2022/04/placeholder-img.jpg" },
    },
    social_links: {
        linkedin: { type: String, default: "" },
    },
    account_info: {
        learningGoals: { type: String, default: "" },
        completedSessions: [mongoose_1.Schema.Types.ObjectId],
        reviews: [mongoose_1.Schema.Types.ObjectId],
        skillLevel: { type: String, enum: ["Newcomer", "Developing", "Proficient", "Master"] },
    },
    wallet: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean },
});
const studentModel = mongoose_1.default.model('Student', studentSchema);
exports.default = studentModel;
