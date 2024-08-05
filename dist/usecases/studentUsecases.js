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
exports.StudentUsecase = void 0;
// import { OtpTemplate } from "./ infrastructure/services/maileTamplate";
const maileTamplate_1 = require("../infrastructure/services/maileTamplate");
// class statusCode {
//     constructor(data,stat){
//     }
// }
class StudentUsecase {
    constructor(studentRepo, otpRepository, uuid, nodeMailer, hashPassword, token, staticFile, reviewRepository, redis) {
        this.otpRepository = otpRepository;
        this.studentRepo = studentRepo;
        this.uuid = uuid;
        this.mailServes = nodeMailer;
        this.hashPassword = hashPassword;
        this.token = token;
        this.staticFile = staticFile;
        this.reviewRepository = reviewRepository;
        this.redis = redis;
    }
    createStudentAccount(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.studentRepo.ifUserExist(student.email);
            console.log(isExist);
            if (isExist) {
                return 409;
            }
            const otp = this.uuid.generateOTPFromUUID();
            console.log(otp);
            const template = (0, maileTamplate_1.OtpTemplate)(student.email, otp, student.userName);
            yield this.mailServes.sendOtpToMail(template);
            yield this.otpRepository.createNewOtp(otp, student);
            return 200;
        });
    }
    verifyStudentAccount(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email) {
                return "";
            }
            const otpValid = yield this.otpRepository.verifyOtp(email, otp);
            console.log("Otp-->", otpValid);
            if (!otpValid)
                return 403;
            otpValid.password = yield this.hashPassword.createHash(otpValid.password);
            const student = yield this.studentRepo.newStudent(otpValid);
            console.log("ddd", student);
            console.log(typeof student);
            const token = this.token.singToken(student);
            return token;
        });
    }
    oauthSuccuss(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                email: user.email,
                _id: user._id
            };
            const token = this.token.singToken(payload);
            return token;
        });
    }
    isOauth(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.token.verifyJwtToken(token);
            console.log(data, "token");
            if (data) {
                const studentData = yield this.studentRepo.findById(data._id);
                // studentData.password = ""
                console.log(data._id, studentData);
                return studentData;
            }
            return false;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.studentRepo.findWithEmail(email);
                if (!user) {
                    return {
                        status: 403,
                        data: "User with the provided email not found"
                    };
                }
                const isPasswordCorrect = yield this.hashPassword.comparePassword(password, user.password);
                if (!isPasswordCorrect) {
                    return {
                        status: 403,
                        data: "Incorrect password"
                    };
                }
                const token = this.token.singToken(user);
                return {
                    status: 200,
                    data: user,
                    token
                };
            }
            catch (error) {
                // Handle errors (e.g., database errors, hashing errors, etc.)
                console.error("Error occurred during login:", error);
                return {
                    status: 500,
                    data: "Internal Server Error"
                };
            }
        });
    }
    forgetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield this.studentRepo.findWithEmail(email);
            console.log(isExist);
            if (!isExist)
                return { status: 403, data: "email not exist" };
            const token = this.token.singToken({ email: isExist.email, _id: isExist._id });
            const payload = (0, maileTamplate_1.forgetPasswordTemplate)(isExist.email, isExist.personal_info.name, token);
            const isSend = yield this.mailServes.sendOtpToMail(payload);
            console.log(isSend);
            if (isSend)
                return { status: 200, data: "email successfully sended" };
        });
    }
    verifyForgetPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isVerified = this.token.verifyJwtToken(token);
            if (!isVerified)
                return { status: 403, data: "token is invalid" };
            if (!password)
                return { status: 200, data: "token is valid" };
            const _id = isVerified._id;
            password = yield this.hashPassword.createHash(password);
            const data = yield this.studentRepo.updatePassword(_id, password);
            console.log(data);
            return { status: 200, data: "password updated successfully" };
        });
    }
    isUserNameExist(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.studentRepo.isUserNameExist(userName))) {
                const nouns = ['Coder', 'Developer', 'Programmer', 'Hacker', 'Ninja', 'Guru', 'Wizard', 'Geek', 'Techie'];
                const userNames = [];
                for (let i = 0; i <= 3; i++) {
                    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
                    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
                    userNames.push(`${userName}_${randomNoun}_${randomNumber}`);
                }
                return { status: 400, data: userNames };
            }
            return { status: 200, data: "user name is  valid" };
        });
    }
    searchStudent() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.studentRepo.getAllStudents();
            return { data, status: 200 };
        });
    }
    getTodyReview(_a) {
        return __awaiter(this, arguments, void 0, function* ({ _id }) {
            const data = yield this.reviewRepository.findTodayReviewWithStudentId(_id);
            console.log(data);
            return { data, status: 200 };
        });
    }
}
exports.StudentUsecase = StudentUsecase;
