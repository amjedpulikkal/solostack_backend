"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const oauth2_1 = require("../middlewares/oauth2");
const injection_1 = require("../../../infrastructure/server/router/injections/injection");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post("/register", (req, res, next) => { injection_1.studentCtrl.createStudentAccount(req, res, next); });
router.post("/verify", (req, res, next) => { injection_1.studentCtrl.verifyStudentAccount(req, res, next); });
router.post("/userName-validate", (req, res, next) => { injection_1.studentCtrl.isUserNameExist(req, res, next); });
router.post("/forgetPassword", (req, res, next) => { injection_1.studentCtrl.forgetPassword(req, res, next); });
router.post("/verifyForgetPassword", (req, res, next) => { injection_1.studentCtrl.verifyForgetPassword(req, res, next); });
router.get("/auth/linkedin", oauth2_1.linkedinOauth);
router.get("/auth/linkedin/callback", oauth2_1.linkedinOauthCallback, (req, res, next) => injection_1.studentCtrl.oauthSuccussControl(req, res, next));
router.get("/test", (req, res, next) => {
    res.send("ok");
});
router.get("/auth/github", oauth2_1.githubOauth);
router.post("/isOauth", (req, res, next) => {
    injection_1.studentCtrl.isOauth(req, res, next);
});
router.get("/auth/github/callback", oauth2_1.githubOauthCallback, (req, res, next) => injection_1.studentCtrl.oauthSuccussControl(req, res, next));
router.get("/auth/google", oauth2_1.googleOauth);
router.get("/auth/google/callback", oauth2_1.googleOauthCallback, (req, res, next) => injection_1.studentCtrl.oauthSuccussControl(req, res, next));
router.post("/signOut", (req, res, next) => { injection_1.studentCtrl.signOut(req, res, next); });
router.post("/login", (req, res, next) => { injection_1.studentCtrl.login(req, res, next); });
router.get("/searchStudent", (req, res, next) => { injection_1.studentCtrl.searchStudent(req, res, next); });
router.get("/getTodyReview", auth_1.isAuthenticated, (req, res, next) => { injection_1.studentCtrl.getTodyReview(req, res, next); });
exports.default = router;
