import { req, res, next } from "../infrastructure/types/serverTypes";
import { ErrorHandler } from "../infrastructure/server/middlewares/error";
import { IstripeUseCases } from "@interfaces/IstripeUseCases";

export  class StripeController {
  private stripeUseCases :IstripeUseCases
  constructor(stripeUseCases :IstripeUseCases) {
    this.stripeUseCases = stripeUseCases
  }
  async webHock(req: req, res: res, next: next) {
    const data = await this.stripeUseCases.webhooks(req.body,req)
    res.status(data.status).json(data)

  }

  async createPaymentIntent(req: req, res: res, next: next) {
    console.log(req.body)
    const data =await this.stripeUseCases.createPaymentIntent({...req.body,...req.user})
    console.log(data)
    res.status(data.status).json(data) 
  }


  async  isSucceeded(req: req, res: res, next: next) {
    const data =await this.stripeUseCases.isSucceeded(req.body)
    console.log(data)
    res.status(data.status).json(data) 
  }
}
