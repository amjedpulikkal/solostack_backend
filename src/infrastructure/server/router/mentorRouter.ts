import { Router } from "express";
import { mentorCtrl } from "./injections/injection";
import { isAuthenticated } from "../middlewares/auth";

const router = Router()
router.post("/register",(req,res,next)=>{mentorCtrl.createMentorAccount(req,res,next)})
router.post("/verify",(req,res,next)=>{mentorCtrl.verifyStudentAccount(req,res,next)})
router.post("/login",(req,res,next)=>{mentorCtrl.login(req,res,next)})
router.post("/update-available-time",isAuthenticated,(req,res,next)=>{mentorCtrl.updateAvailableTime(req,res,next)})
router.post("/get-available-time",isAuthenticated,(req,res,next)=>{mentorCtrl.getAvailableTime(req,res,next)})






export default router

