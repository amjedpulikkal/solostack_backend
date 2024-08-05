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
const mentorSchema_1 = require("../model/mentorSchema");
class ReviewRepository {
    constructor(review) {
        this.reviewModel = review;
    }
    createNewReview(date, time, mentorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("------date------->", date);
            if (Array.isArray(time)) {
                const promises = time.map((t) => __awaiter(this, void 0, void 0, function* () {
                    const filter = { mentorId, date, time: t };
                    const update = { mentorId, date, time: t };
                    const options = { upsert: true, new: true };
                    return yield this.reviewModel.findOneAndUpdate(filter, update, options).exec();
                }));
                const results = yield Promise.all(promises);
                return results;
            }
            const filter = { mentorId, date, time };
            const update = { mentorId, date, time };
            const options = { upsert: true, new: true };
            return yield this.reviewModel.findOneAndUpdate(filter, update, options).exec();
        });
    }
    getAvailableTime(_id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(date, "===============", new mentorSchema_1.ObjectId(_id));
            return yield this.reviewModel.find({ mentorId: new mentorSchema_1.ObjectId(_id), date: new Date(date) }).populate("requests.studentId").populate("bookedId");
        });
    }
    getAllMentorAvailableTime(date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(date, "===============", time);
            return yield this.reviewModel.find({ date: new Date(date), time, isBooked: false }).populate("mentorId");
        });
    }
    getAllMentorsWithDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reviewModel.find({ date: new Date(date) }).populate("mentorId");
        });
    }
    storeRequest(data, mentorRvId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data, "data", mentorRvId, id);
            return yield this.reviewModel.findByIdAndUpdate(mentorRvId, { $push: { requests: { studentId: id, reviewFor: data } } });
        });
    }
    updateReviewTime(reviewId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reviewModel.findByIdAndUpdate(id, { $set: { bookedId: reviewId, isBooked: true } });
        });
    }
}
exports.ReviewRepository = ReviewRepository;
