
import { JwtPayload } from "../../../infrastructure/@types/type"; 
import Istudent from "../../../entities/student";
import { Profile as GitHubProfile } from 'passport-github2';
import { Profile as LinkedInProfile } from 'passport-linkedin-oauth2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
export interface Iuuid {
    generateOTPFromUUID(): number;

}


export interface InodeMailer {

    sendOtpToMail(payload: { from: string, to: string, subject: string, text: string, html: string }): Promise<boolean | Error>


}


export interface IHashpassword {
    createHash(password: string): Promise<string>
    comparePassword(password: string, hashPassword: string): Promise<boolean>
}
export interface Itoken {

    verifyJwtToken(token: string): JwtPayload | boolean 
    singToken(payload: Istudent|{email:string,_id:string}): string;
}

export interface PassportResponse {
    (
        accessToken: string,
        refreshToken: string,
        profile: GitHubProfile | LinkedInProfile | GoogleProfile,
        done: (error: any, user?: any) => void
    )


}
export interface IPassport {
    githubOauth: any;
    googleOauth: any;
    linkedinOauth: any;
    linkedinOauthCallback: any;
    githubOauthCallback: any;
    googleOauthCallback: any;
    new(
        gitOauthControl: PassportResponse,
        googleControl: PassportResponse,
        linkedinControl: PassportResponse
    ): IPassport;

}
