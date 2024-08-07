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
exports.ReviewRepository = void 0;
const mongo_1 = require("../../types/mongo");
class ReviewRepository {
    constructor(review) {
        this.reviewModel = review;
    }
    createNewReview(reviewTime, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = {
                date: reviewTime.date,
                time: reviewTime.time,
                mentorId: reviewTime.mentorId,
                studentId,
            };
            console.log(review);
            return yield this.reviewModel.create(review);
        });
    }
    findTodayReviewWithStudentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.reviewModel.find({ studentId: new mongo_1.ObjectId(id), status: "pending", date: new Date((new Date()).toDateString()) }).populate("mentorId");
            return data[data.length - 1];
        });
    }
    findTodayReviewWithMentorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.reviewModel.find({ mentorId: new mongo_1.ObjectId(id), status: "pending", date: new Date((new Date()).toDateString()) }).populate("studentId");
            return data[data.length - 1];
        });
    }
}
exports.ReviewRepository = ReviewRepository;
