import { Router } from "express";
import {
    githubOauth,
    githubOauthCallback,
    googleOauthCallback,
    googleOauth,
    linkedinOauth,
    linkedinOauthCallback
} from "../middlewares/oauth2";
import {studentCtrl} from "../../../infrastructure/server/router/injections/injection"



 
const router = Router()

router.post("/register",(req,res,next)=>{studentCtrl.createStudentAccount(req,res,next)})
router.post("/verify",(req,res,next)=>{studentCtrl.verifyStudentAccount(req,res,next)})

router.get("/auth/linkedin",linkedinOauth)
router.get("/auth/linkedin/callback",linkedinOauthCallback,(req,res,next)=>studentCtrl.oauthSuccussControl(req,res,next))

router.get("/test",(req,res,next)=>{
    res.send("ok")
}) 
router.get("/auth/github",githubOauth) 
router.post("/isOauth",(req,res,next)=>{
    studentCtrl.isOauth(req,res,next)
}) 
router.get("/auth/github/callback",githubOauthCallback,(req,res,next)=>studentCtrl.oauthSuccussControl(req,res,next))

router.get("/auth/google",googleOauth)
router.get("/auth/google/callback",googleOauthCallback,(req,res,next)=>studentCtrl.oauthSuccussControl(req,res,next))

router.post("/signOut",(req,res,next)=>{studentCtrl.signOut(req,res,next)})
router.post("/login",(req,res,next)=>{studentCtrl.login(req,res,next)})



export default router