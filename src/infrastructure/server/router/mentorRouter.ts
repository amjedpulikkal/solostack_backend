import { Router } from "express";
import { mentorCtrl } from "./injections/injection";
import { isAuthenticated } from "../middlewares/auth";
import { WidgetValidation } from "../middlewares/turnstileWidget";
import { uploadFileToBuffer } from "../middlewares/multer";

const router = Router()
router.post("/register",(req,res,next)=>{mentorCtrl.createMentorAccount(req,res,next)})
router.post("/verify",(req,res,next)=>{mentorCtrl.verifyStudentAccount(req,res,next)})
router.post("/login",(req,res,next)=>{mentorCtrl.login(req,res,next)})

router.post("/",(req,res,next)=>{mentorCtrl.getMentorProfile(req,res,next)})

router.post("/update-available-time",isAuthenticated,(req,res,next)=>{mentorCtrl.updateAvailableTime(req,res,next)})
router.post("/get-available-time",isAuthenticated,(req,res,next)=>{mentorCtrl.getAvailableTime(req,res,next)})
router.post("/get-all-available-time",isAuthenticated,(req,res,next)=>{mentorCtrl.getAllAvailableTime(req,res,next)})

router.post("/get-all-mentors",isAuthenticated,(req,res,next)=>{mentorCtrl.getAllMentors(req,res,next)})
router.put("/update-image",isAuthenticated,uploadFileToBuffer,(req,res,next)=>{mentorCtrl.updateMentorProfilePhoto(req,res,next)})
router.put("/student/storeRequest",isAuthenticated,(req,res,next)=>{mentorCtrl.storeRequest(req,res,next)})



export default router

