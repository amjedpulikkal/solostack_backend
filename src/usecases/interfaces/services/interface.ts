import { JwtPayload } from "../../../infrastructure/types/type";
import Istudent from "../../../entities/student";
import { Imentor } from "../../../entities/mentor";
import { Profile as GitHubProfile } from "passport-github2";
import { Profile as LinkedInProfile } from "passport-linkedin-oauth2";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import Stripe from "stripe";

import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { AxiosResponse } from "axios";
export interface Iuuid {
  generateOTPFromUUID(): number;
}

export interface InodeMailer {
  sendOtpToMail(payload: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<boolean | Error>;
}

export interface IHashpassword {
  createHash(password: string): Promise<string>;
  comparePassword(password: string, hashPassword: string): Promise<boolean>;
}
export interface Itoken {
  verifyJwtToken(token: string): JwtPayload | boolean;
  singToken(
    payload: Imentor | Istudent | { email: string; _id: string,admin?:boolean }
  ): string;
}

export interface PassportResponse {
  (
    accessToken: string,
    refreshToken: string,
    profile: GitHubProfile | LinkedInProfile | GoogleProfile,
    done: (error: any, user?: any) => void
  );
}
export interface IPassport {
  githubOauth: any;
  googleOauth: any;
  linkedinOauth: any;
  linkedinOauthCallback: any;
  githubOauthCallback: any;
  googleOauthCallback: any;
  new (
    gitOauthControl: PassportResponse,
    googleControl: PassportResponse,
    linkedinControl: PassportResponse
  ): IPassport;
}
export interface IAwsS2 {
  uploadFile(file: Buffer, type: string): Promise<string | boolean>;
}

export interface ISharp {
  resizeImage(input: Buffer, width: number, hight: number): Promise<Buffer>;
}

export type ISocket = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

export interface IRedisDb {
  setData(key: string, value: any): Promise<void>;
  getData(key: string): Promise<any>;
  setDataWithEx(key: string, value: any, ttl: number): Promise<void>;
}
export interface StripeServices {
  createPayment(
    amount: number,
    type: string,
    userId: string
  ): Promise<Stripe.Response<Stripe.PaymentIntent>>;
  webhooks(body: any, sig: any): Promise<Stripe.Event | Error>;
}
export interface ExchangeRate {
  getUsdRate(): Promise<number>;
  convertInrToUsd(inr: number): Promise<number>;
}

export type socketEemitEventToUser = (
  userId: string,
  eventName: string,
  eventData: any
) => Promise<void>;

export interface TurnStunServer {
  getIceServer(): Promise<AxiosResponse<any, any>>;
}

export interface Logger {
  logDebug(error: string): void;
}

// export interface ISocketIo{
//   socketEmitEventToUser(userId: string, eventName: string, eventData: any): Promise<void>
// }
