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
exports.studentController = void 0;
const error_1 = require("../infrastructure/server/middlewares/error");
require("dotenv").config();
const statusCodes = {
    100: "Continue",
    101: "Switching Protocols",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Payload Too Large",
    414: "URI Too Long",
    415: "Unsupported Media Type",
    416: "Range Not Satisfiable",
    417: "Expectation Failed",
    426: "Upgrade Required",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
};
class studentController {
    constructor(studentUsecase) {
        this.studentUsecase = studentUsecase;
    }
    createStudentAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const data = yield this.studentUsecase.createStudentAccount(req.body);
                if (data === 200)
                    return res.status(201).json(true);
                if (data === 409)
                    return res.status(409).json("Email already used");
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
                const token = yield this.studentUsecase.verifyStudentAccount(email, otp);
                if (token === 403) {
                    res.status(403).json("otp not valid");
                }
                else {
                    res.cookie("jwtToken", token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "strict",
                        maxAge: 604800000,
                        path: "/",
                    });
                    console.log(token);
                    res.status(201).json(token);
                }
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    oauthSuccussControl(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const student = req.user;
                console.log(student, "student----");
                const token = yield this.studentUsecase.oauthSuccuss(student);
                console.log(token, "<=========>");
                res.redirect(`${process.env.CLIENT_SERVER}/oauth/${(_a = req.user) === null || _a === void 0 ? void 0 : _a.provider}/${token}`);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    isOauth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                console.log((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwtToken, "token_______________dddd");
                const studentData = yield this.studentUsecase.isOauth((_b = req.cookies) === null || _b === void 0 ? void 0 : _b.jwtToken);
                console.log("student", studentData);
                if (studentData)
                    return res.status(200).json(studentData);
                return res.status(401).json(statusCodes[401]);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    signOut(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                req.logout(function (err) {
                    // if (err) { return next(err); }
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json("ok");
                    }
                });
                // return res.redirect('/');
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
                const data = yield this.studentUsecase.login(email, password);
                console.log("dataRes", data);
                if (data.status === 200)
                    return res
                        .cookie("jwtToken", data === null || data === void 0 ? void 0 : data.token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'none',
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
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                console.log(email);
                const data = yield this.studentUsecase.forgetPassword(email);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    verifyForgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, password } = req.body;
                const data = yield this.studentUsecase.verifyForgetPassword(token, password);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    isUserNameExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName } = req.body;
                const data = yield this.studentUsecase.isUserNameExist(userName);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
    searchStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.studentUsecase.searchStudent();
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
                const data = yield this.studentUsecase.getTodyReview(req.user);
                res.status(data.status).json(data.data);
            }
            catch (error) {
                console.log(error);
                next(new error_1.ErrorHandler());
            }
        });
    }
}
exports.studentController = studentController;
