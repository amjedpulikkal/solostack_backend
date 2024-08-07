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
const error_1 = require("../infrastructure/server/middlewares/error");
class MentorController {
    constructor(mentorUseCases) {
        this.mentorUseCases = mentorUseCases;
    }
    createMentorAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.mentorUseCases.createMentorAccount(req.body);
                return res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    verifyStudentAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = req.body;
                console.log(email, otp);
                const data = yield this.mentorUseCases.verifyMentorAccount(email, otp);
                if (data.status === 201) {
                    res.cookie("jwtToken", data.token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 604800000,
                        path: "/",
                    });
                    console.log(data);
                    return res.status(data.status).json(data.data);
                }
                return res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password);
                const data = yield this.mentorUseCases.login(email, password);
                console.log("dataRes", data);
                if (data.status === 200)
                    return res
                        .cookie("jwtToken", data === null || data === void 0 ? void 0 : data.token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 604800000,
                        path: "/",
                    })
                        .status(data.status)
                        .json(data.data);
                return res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    updateAvailableTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, time } = req.body;
                const user = req.user;
                const data = yield this.mentorUseCases.updateAvailableTime(user, {
                    date,
                    time,
                });
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    getAllAvailableTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, time } = req.body;
                const data = yield this.mentorUseCases.getAllMentorAvailableTime(date, time);
                // console.log(date, data)
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.error(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    getAvailableTime(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.body;
                console.log(req.body);
                const user = req.user;
                const data = yield this.mentorUseCases.getAvailableTime(user, date);
                // console.log(date, data)
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    getAllMentors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = req.body;
                const data = yield this.mentorUseCases.getAllMentors(date);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    getMentorProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName } = req.body;
                console.log(userName);
                const data = yield this.mentorUseCases.getMentorProfile(userName);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    updateMentorProfilePhoto(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                console.log(user);
                const data = yield this.mentorUseCases.updateProfilePhoto(user, req.file);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    storeRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.mentorUseCases.storeRequest(Object.assign(Object.assign({}, req.body), { user: req.user }));
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    searchMentor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    acceptRequest(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.mentorUseCases.acceptRequest(req.body);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    getTodyReview(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.mentorUseCases.getTodyReview(req.user);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
}
exports.default = MentorController;
