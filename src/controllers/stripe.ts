import { req, res, next } from "../infrastructure/types/serverTypes";
import { ErrorHandler } from "../infrastructure/server/middlewares/error";
import { IstripeUseCases } from "@interfaces/IstripeUseCases";

export class StripeController {
  private stripeUseCases: IstripeUseCases;
  constructor(stripeUseCases: IstripeUseCases) {
    this.stripeUseCases = stripeUseCases;
  }
  async webHock(req: req, res: res, next: next) {
    try {
      const data = await this.stripeUseCases.webhooks(req.body, req);
      res.status(data.status).json(data);
    } catch (error) {
     
      next(new ErrorHandler(error));
    }
  }

  async createPaymentIntent(req: req, res: res, next: next) {
    try {
      console.log(req.body);
      const data = await this.stripeUseCases.createPaymentIntent({
        ...req.body,
        ...req.user,
      });
      console.log(data);
      res.status(data.status).json(data);
    } catch (error) {
      next(new ErrorHandler(error));
    }
  }

  async isSucceeded(req: req, res: res, next: next) {
    try {
      const data = await this.stripeUseCases.isSucceeded(req.body);
      console.log(data);
      res.status(data.status).json(data);
    } catch (error) {
     
      next(new ErrorHandler(error));
    }
  }

  async turn_and_stun_server(req: req, res: res, next: next) {
    try {
      const data = await this.stripeUseCases.turn_and_stun_server();
      // console.log(data);
      res.status(data.status).json(data);
    } catch (error) {
     
      next(new ErrorHandler(error));
    }
  }
}
