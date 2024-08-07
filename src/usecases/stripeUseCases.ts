import { ResponseObj } from "@infrastructure/types/type";
import { IstripeUseCases } from "@interfaces/IstripeUseCases";
import { IPaymentHistoryRepository } from "@interfaces/repositroey/IpaymentHistoryRepository";
import { IstudentRepository } from "@interfaces/repositroey/IstudentRepository";
import {
  ExchangeRate,
  StripeServices,
  TurnStunServer,
} from "@interfaces/services/interface";

export class StripeUseCases implements IstripeUseCases {
  private stripe: StripeServices;
  private paymentHistory: IPaymentHistoryRepository;
  private studentRepo: IstudentRepository;
  private exchangeRate: ExchangeRate;
  private turnStunServer: TurnStunServer;
  constructor(
    stripe: StripeServices,
    paymentHistory: IPaymentHistoryRepository,
    studentRepo: IstudentRepository,
    exchangeRate: ExchangeRate,
    turnStunServer: TurnStunServer
  ) {
    this.stripe = stripe;
    this.paymentHistory = paymentHistory;
    this.exchangeRate = exchangeRate;
    this.studentRepo = studentRepo;
    this.turnStunServer = turnStunServer;
  }

  async createPaymentIntent({
    amount,
    type = "usd",
    _id,
  }: {
    amount: number;
    type: string;
    _id: string;
  }): Promise<ResponseObj> {
    console.log(amount, _id);

    const paymentIntent = await this.stripe.createPayment(amount, type, _id);

    return { data: paymentIntent, status: 200 };
  }
  async webhooks(body: any, req): Promise<ResponseObj> {
    const sig = req.headers["stripe-signature"];

    const event = await this.stripe.webhooks(body, sig);
    if (!(event instanceof Error)) {
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntent = event.data.object;

          this.paymentHistory.updateStatus(paymentIntent.id, "succeeded");
          console.log(
            `PaymentIntent was successful for amount ${
              (paymentIntent.amount, event.data.object)
            }`
          );
          if (paymentIntent.currency === "inr") {
            paymentIntent.amount = await this.exchangeRate.convertInrToUsd(
              paymentIntent.amount / 100
            );
            console.log(paymentIntent.amount, "---------------");
          } else {
            paymentIntent.amount = paymentIntent.amount / 100;
          }

          this.studentRepo.ingressWallet(
            paymentIntent.metadata.userId,
            paymentIntent.amount
          );
          console.log(paymentIntent);
          break;
        case "payment_intent.payment_failed":
          const paymentFailedIntent = event.data.object;
          this.paymentHistory.updateStatus(paymentFailedIntent.id, "failed");

          console.log(
            `PaymentIntent failed: ${paymentFailedIntent.last_payment_error?.message}`
          );
          break;

        case "payment_intent.created":
          const paymentCreatedIntent = event.data.object;
          console.log(paymentCreatedIntent);
          this.paymentHistory.InsertNewDoc({
            userId: paymentCreatedIntent.metadata.userId,
            amount: paymentCreatedIntent.amount / 100,
            currency: paymentCreatedIntent.currency,
            status: "pending",
            paymentMethod: "",
            description: "",
            stripePaymentIntentId: paymentCreatedIntent.id,
          });
          break;

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    }
    return { data: null, status: 200 };
  }

  async isSucceeded({ stripePaymentIntentId }): Promise<ResponseObj> {
    const isSucceeded = await this.paymentHistory.isSucceeded(
      stripePaymentIntentId
    );

    if (isSucceeded) {
      return { data: isSucceeded, status: 200 };
    } else {
      return { data: isSucceeded, status: 404 };
    }
  }
  async turn_and_stun_server(): Promise<ResponseObj> {
    const data = await this.turnStunServer.getIceServer();
    return { status: 200, data };
  }
}
