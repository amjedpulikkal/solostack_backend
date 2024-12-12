import { Router } from "express";
import { adminController } from "./injections/injection";
const router = Router()

router.route("/login").post((req,res,next)=>adminController.signUpAdmin(req,res,next))
export default router
