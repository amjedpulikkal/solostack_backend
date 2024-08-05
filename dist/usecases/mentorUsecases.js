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
exports.MentorUseCases = void 0;
const maileTamplate_1 = require("../infrastructure/services/maileTamplate");
class MentorUseCases {
    constructor(mentorRepo, reviewTimeRepo, otpRepository, uuid, nodeMailer, hashPassword, token, staticFile, sharp, reviewRepository, redis, socketIo) {
        this.otpRepository = otpRepository;
        this.reviewTimeRepository = reviewTimeRepo;
        this.mentorRepo = mentorRepo;
        this.uuid = uuid;
        this.mailServes = nodeMailer;
        this.hashPassword = hashPassword;
        this.token = token;
        this.staticFile = staticFile;
        this.imageResize = sharp;
        this.reviewRepository = reviewRepository;
        this.redis = redis;
        this.socketIo = socketIo;
    }
    createMentorAccount(mentor) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.mentorRepo.ifUserExist(mentor.email);
            console.log(isExist);
            if (isExist) {
                return {
                    status: 409,
                    data: "email is exist",
                };
            }
            const otp = this.uuid.generateOTPFromUUID();
            console.log(otp);
            const template = (0, maileTamplate_1.OtpTemplate)(mentor.email, otp, mentor.userName);
            yield this.mailServes.sendOtpToMail(template);
            yield this.otpRepository.createNewOtp(otp, mentor);
            return {
                status: 200,
                data: "otp sent",
            };
        });
    }
    verifyMentorAccount(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                return { status: 403, data: "email is " };
            }
            const otpValid = (yield this.otpRepository.verifyOtp(email, otp));
            console.log("Otp-------------->", otpValid);
            if (!otpValid)
                return { status: 403, data: "otp not valid" };
            otpValid.password = yield this.hashPassword.createHash(otpValid.password);
            const mentor = yield this.mentorRepo.newMentor(otpValid);
            console.log("ddd", mentor);
            console.log(typeof mentor);
            const token = this.token.singToken(mentor);
            return { status: 201, token, data: mentor };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.mentorRepo.findWithEmail(email);
                if (!user) {
                    return {
                        status: 403,
                        data: "User with the provided email not found",
                    };
                }
                const isPasswordCorrect = yield this.hashPassword.comparePassword(password, user.password);
                if (!isPasswordCorrect) {
                    return {
                        status: 403,
                        data: "Incorrect password",
                    };
                }
                const token = this.token.singToken(user);
                return {
                    status: 200,
                    data: user,
                    token,
                };
            }
            catch (error) {
                console.error("Error occurred during login:", error);
                return {
                    status: 500,
                    data: "Internal Server Error",
                };
            }
        });
    }
    updateAvailableTime(mentor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.reviewTimeRepository.createNewReview(date.date, date.time, mentor._id);
            return { data, status: 200 };
        });
    }
    getAvailableTime(mentor, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(date, "------------");
            const data = yield this.reviewTimeRepository.getAvailableTime(mentor._id, date);
            return { data, status: 200 };
        });
    }
    getAllMentorAvailableTime(date, time) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(date, "------date------");
            const data = yield this.reviewTimeRepository.getAllMentorAvailableTime(date, time);
            console.log(data);
            return { data, status: 200 };
        });
    }
    getAllMentors(date) {
        return __awaiter(this, void 0, void 0, function* () {
            if (date) {
                const allMentors = yield this.reviewTimeRepository.getAllMentorsWithDate(date);
                console.log("allMentors", allMentors);
                return { data: allMentors, status: 200 };
            }
            else {
                const allMentors = yield this.mentorRepo.getAllMentors();
                return { data: allMentors, status: 200 };
            }
        });
    }
    getMentorProfile(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.mentorRepo.getMentorProfile(userName);
            if (data)
                return { data, status: 200 };
            return { data, status: 400 };
        });
    }
    updateProfilePhoto(mentor, file) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            file.buffer = yield this.imageResize.resizeImage(file.buffer, 460, 460);
            const imagePath = yield this.staticFile.uploadFile(file.buffer, file.originalname);
            if (imagePath && imagePath !== true) {
                const data = yield this.mentorRepo.updateUserPhoto(mentor._id, imagePath);
                data.personal_info.photo = imagePath;
                delete data.password;
                return { data, status: 200 };
            }
            else {
                return { data: "", status: 500 };
            }
        });
    }
    storeRequest(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data, mentorRVId, user }) {
            const resData = yield this.reviewTimeRepository.storeRequest(data, mentorRVId, user._id);
            return { data: resData, status: 200 };
        });
    }
    searchMentor() {
        return __awaiter(this, void 0, void 0, function* () {
            const resData = yield this.mentorRepo.getAllMentors();
            return { data: resData, status: 200 };
        });
    }
    acceptRequest(_a) {
        return __awaiter(this, arguments, void 0, function* ({ reviewTime, studentID, }) {
            console.log(studentID);
            const reviewCl = yield this.reviewRepository.createNewReview(reviewTime, studentID);
            this.redis.setData(reviewCl._id.toString(), { mentor: {
                    id: reviewCl.mentorId.toString(),
                    peerId: null
                }, student: { peerId: null,
                    id: reviewCl.studentId.toString()
                } });
            const data = yield this.reviewTimeRepository.updateReviewTime(reviewCl === null || reviewCl === void 0 ? void 0 : reviewCl._id, reviewTime._id);
            this.socketIo(reviewCl.mentorId.toString(), "newObj", { data: yield this.reviewTimeRepository.getAvailableTime(reviewCl.mentorId.toString(), reviewCl.date) });
            return { status: 200, data };
        });
    }
}
exports.MentorUseCases = MentorUseCases;
