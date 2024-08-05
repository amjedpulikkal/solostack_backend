import express, { Router } from "express";
import { stripeController } from "./injections/injection";
import { isAuthenticated } from "../middlewares/auth";


const router = Router()

router.post("/api/v1/stripe/create-payment-intent",isAuthenticated,(req,res,next)=>{stripeController.createPaymentIntent(req,res,next)})
router.post("/api/v1/stripe/isSucceeded",isAuthenticated,(req,res,next)=>{stripeController.isSucceeded(req,res,next)})

router.post("/webhook", (req, res, next) => {
    stripeController.webHock(req, res, next)
  })
router.get("/test",(req,res)=>res.send("ok"))


export default router

