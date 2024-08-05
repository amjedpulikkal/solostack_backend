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
exports.MentorRepository = void 0;
const mentorSchema_1 = __importDefault(require("../../mongodb/model/mentorSchema"));
class MentorRepository {
    ifUserExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield mentorSchema_1.default.findOne({ email });
            console.log(isExist);
            return isExist ? true : false;
        });
    }
    newMentor(mentor) {
        return __awaiter(this, void 0, void 0, function* () {
            const Mentor = {
                email: mentor.email,
                password: mentor.password || "",
                personal_info: {
                    userName: mentor.userName,
                    name: mentor.userName,
                    bio: "",
                    photo: mentor.photos || ""
                },
                wallet: 0,
                isBlocked: false,
                social_links: {
                    linkedin: ""
                },
                account_info: {
                    PreferredMeetingDuration: 0,
                    Ratings: [],
                    YearsOfExperience: 0,
                    Review: []
                },
                joinedAt: undefined
            };
            const newMentor = yield mentorSchema_1.default.create(Mentor);
            return newMentor;
        });
    }
    findWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const mentor = yield mentorSchema_1.default.findOne({ email });
            console.log(mentor);
            return mentor;
        });
    }
    pushNewDate(email_1, _a) {
        return __awaiter(this, arguments, void 0, function* (email, { date, time }) {
            const newAvailability = {
                date,
                time
            };
            const isExist = yield mentorSchema_1.default.findOne({ email, 'account_info.Availability.date': date });
            if (isExist) {
                const data = mentorSchema_1.default.findOneAndUpdate({ email, "account_info.Availability.date": date }, { $set: { "account_info.Availability.$.time": time } }, { new: true });
                return data;
            }
            else {
                const data = yield mentorSchema_1.default.findOneAndUpdate({ email }, { $push: { 'account_info.Availability': newAvailability } });
                return data;
            }
        });
    }
    gatAvailableTimeWithDate(_id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const available = yield mentorSchema_1.default.findById(_id);
            console.log(available, "------------------");
            const filteredData = available.account_info.Availability.filter(item => {
                console.log(item.date.getTime() === new Date(date).getTime());
                if (item.date.getTime() === new Date(date).getTime()) {
                    return item;
                }
            });
            console.log("++++++++  ", available.account_info.Availability);
            console.log("++++++++  ", filteredData);
            return filteredData[0];
        });
    }
    getAllMentors() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mentorSchema_1.default.find({}, { password: 0 });
        });
    }
    getAllMentorWithDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mentorSchema_1.default.find({}, { password: 0 });
            return data.filter(obj => {
                return obj.account_info.Availability.filter(obj => obj.date === date);
            });
        });
    }
    getMentorProfile(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mentorSchema_1.default.findOne({ "personal_info.userName": userName });
        });
    }
    updateUserPhoto(id, photoPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield mentorSchema_1.default.findByIdAndUpdate(id, { "personal_info.photo": photoPath });
        });
    }
}
exports.MentorRepository = MentorRepository;
