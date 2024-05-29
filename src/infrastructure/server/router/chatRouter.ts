import { Router } from "express";
import { chatCtrl } from "./injections/injection";
import { uploadFileToBuffer } from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/auth";
const router = Router()

router.route("/").post(uploadFileToBuffer,(req,res,next)=>chatCtrl.createNewGroup(req,res,next)).get((req,res,next)=>chatCtrl.getAllGroups(req,res,next))
router.route("/join").post(isAuthenticated,(req,res,next)=>chatCtrl.joinNewGroup(req,res,next))
router.route("/groups").post((req,res,next)=>chatCtrl.getAllGroupWithID(req,res,next)).get((req,res,next)=>{chatCtrl.getAllGroups(req,res,next)})
router.route("/chat-history").post((req,res,next)=>chatCtrl.getChatHistory(req,res,next))




export default router