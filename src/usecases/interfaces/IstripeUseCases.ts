import { ResponseObj } from "@infrastructure/types/type"


export interface IstripeUseCases{
    webhooks(body:any,req):Promise<ResponseObj>
    createPaymentIntent({amount,type}: {amount:number,type:string}):Promise<ResponseObj>
    isSucceeded({ stripePaymentIntentId }):Promise<ResponseObj> 
    turn_and_stun_server():Promise<ResponseObj>
}