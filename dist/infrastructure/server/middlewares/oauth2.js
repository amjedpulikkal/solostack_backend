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
exports.googleOauthCallback = exports.githubOauthCallback = exports.linkedinOauthCallback = exports.linkedinOauth = exports.googleOauth = exports.githubOauth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const passport_linkedin_oauth2_1 = require("passport-linkedin-oauth2");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const studentRepository_1 = require("../../mongodb/repository/studentRepository");
const token_1 = require("../../services/token");
const db = new studentRepository_1.StudentRepository();
const token = new token_1.Token();
require("dotenv").config();
// interface PassportResponse {
//      (
//          accessToken: string,
//          refreshToken: string,
//          profile: GitHubProfile | LinkedInProfile | GoogleProfile,
//          done: (error: any, user?: any) => void
//      )
// }
function PassportResponse(accessToken, refreshToken, profile, done) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(accessToken, "          ", refreshToken);
        process.nextTick(function () {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                console.log(accessToken, refreshToken);
                const isExist = yield db.findWithEmail((_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value);
                console.log(isExist);
                console.log(`---------------${profile.provider}--------------------`);
                console.log(profile);
                console.log(`---------------${profile.provider}--------------------`);
                if (!isExist) {
                    const Student = {
                        email: (_d = (_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value,
                        name: profile.displayName,
                        photos: (_f = (_e = profile.photos) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.value
                    };
                    console.log(Student);
                    console.log("dsdwewwwwwwwwwwww");
                    const student = yield db.newStudent(Student);
                    return done(null, student);
                }
                return done(null, isExist);
            });
        });
    });
}
passport_1.default.use(new passport_github2_1.Strategy({
    clientID: process.env.gitHubClintId,
    clientSecret: process.env.gitHubsecret,
    callbackURL: `${process.env.server}/api/v1/student/auth/github/callback`
}, PassportResponse));
passport_1.default.use(new passport_linkedin_oauth2_1.Strategy({
    clientID: process.env.linkedinClintId,
    clientSecret: process.env.linkedinSecret,
    callbackURL: `${process.env.server}/api/v1/student/auth/linkedin/callback`
}, PassportResponse));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.googleClintId,
    clientSecret: process.env.googleSecret,
    callbackURL: `${process.env.server}/api/v1/student/auth/google/callback`
}, PassportResponse));
exports.githubOauth = passport_1.default.authenticate('github', { scope: ["user:email"] });
exports.googleOauth = passport_1.default.authenticate("google", { scope: ["profile", "email"] });
exports.linkedinOauth = passport_1.default.authenticate('linkedin', { scope: ['profile', "email"] });
exports.linkedinOauthCallback = passport_1.default.authenticate('linkedin', {
    failureRedirect: '/login'
});
exports.githubOauthCallback = passport_1.default.authenticate('github', {
    failureRedirect: '/login'
});
exports.googleOauthCallback = passport_1.default.authenticate('google', {
    failureRedirect: '/login'
});
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (User, done) {
    return done(null, User);
});
