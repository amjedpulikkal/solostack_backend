import { Router } from "express";

import {studentCtrl} from "../../../infrastructure/server/router/injections/injection"



 
const router = Router()

router.post("/register",(req,res)=>{studentCtrl.createStudentAccount(req,res)})




export default router