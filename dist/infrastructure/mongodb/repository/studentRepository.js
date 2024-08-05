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
exports.StudentRepository = void 0;
const studentSchema_1 = __importDefault(require("../../mongodb/model/studentSchema"));
// import { singUpBody } from "../../types/reqBodey";
class StudentRepository {
    ifUserExist(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield studentSchema_1.default.findOne({ email });
            return isExist ? true : false;
        });
    }
    newStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const Student = {
                email: student.email,
                password: student.password || "",
                personal_info: {
                    userName: student.userName,
                    name: student.userName,
                    age: 0,
                    bio: "",
                    photo: student.photos || ""
                },
                wallet: 0,
                isBlocked: false
            };
            const newStudent = yield studentSchema_1.default.create(Student);
            return newStudent;
        });
    }
    upsertStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const Student = {
                email: student.email,
                password: student.password || "",
                personal_info: {
                    userName: "",
                    name: student.name,
                    age: 0,
                    bio: "",
                    photo: student.photos || ""
                },
                wallet: 0,
                isBlocked: false
            };
            const newStudent = yield studentSchema_1.default.findOneAndUpdate({ email: student.email }, { $set: Student }, { upsert: true, new: true });
            return newStudent;
        });
    }
    findWithEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield studentSchema_1.default.findOne({ email });
            return student;
        });
    }
    findById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentSchema_1.default.findById(_id);
        });
    }
    updatePassword(_id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentSchema_1.default.findByIdAndUpdate(_id, { $set: { password } });
        });
    }
    isUserNameExist(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            return !!(yield studentSchema_1.default.findOne({ "personal_info.userName": userName }));
        });
    }
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentSchema_1.default.find({}, { password: 0 });
        });
    }
    ingressWallet(userId, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentSchema_1.default.findByIdAndUpdate(userId, { $inc: { wallet: amount } });
        });
    }
}
exports.StudentRepository = StudentRepository;
