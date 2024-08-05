import Stripe from "stripe";

const stripe = new Stripe(process.env.stripe_sk);

export class StripeServices {
  async createPayment(
      amount:number,type:string,userId:string
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: type,
      metadata: {
        userId
      }
    });

    return paymentIntent;
  }
  async webhooks(body: any, sig: any):Promise<Stripe.Event| Error> {
    const endpointSecret = process.env.stripe_wh
    try {
     return stripe.webhooks.constructEvent(
        body,
        sig,
        endpointSecret
      );

    } catch (err) {
      return err
    }
  }
}
