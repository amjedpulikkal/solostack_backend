// import { Request, Response, NextFunction } from "express";
// import passport from "passport";
// import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
// import { Strategy as LinkedInStrategy, Profile as LinkedInProfile } from 'passport-linkedin-oauth2';
// import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
// import dotenv from "dotenv";
// import { IPassport } from "../../usecases/interfaces/services/interface";
// dotenv.config();

// interface PassportResponse {
//     (
//         accessToken: string,
//         refreshToken: string,
//         profile: GitHubProfile | LinkedInProfile | GoogleProfile,
//         done: (error: any, user?: any) => void
//     )


// }
// // (accessToken: string, refreshToken: string, profile: LinkedInProfile, done: (error: any, user?: any) => void) => {
// //     console.log(accessToken, "          ", refreshToken);
// //     console.log("---------------linkedin--------------------");
// //     console.log(profile);
// //     console.log("---------------linkedin--------------------");
// //     return done(null, profile);
// // }
// export class PassportServes {
//     githubOauth: any;
//     googleOauth: any;
//     linkedinOauth: any;
//     linkedinOauthCallback: any;
//     githubOauthCallback: any;
//     googleOauthCallback: any;

//     constructor(gitOauthControl: PassportResponse, googleControl: PassportResponse, linkedinControl: PassportResponse) {
//         passport.use(new GitHubStrategy({
//             clientID: process.env.gitHubClintId!,
//             clientSecret: process.env.gitHubsecret!,
//             callbackURL: `${process.env.SERVER}/api/v1/student/auth/github/callback`
//         },
//             gitOauthControl
//         ));

//         passport.use(new LinkedInStrategy({
//             clientID: process.env.linkedinClintId!,
//             clientSecret: process.env.linkedinSecret!,
//             callbackURL: `${process.env.SERVER}/api/v1/student/auth/linkedin/callback`
//         },
//             linkedinControl
//         ));

//         passport.use(new GoogleStrategy({
//             clientID: process.env.googleClintId!,
//             clientSecret: process.env.googleSecret!,
//             callbackURL: `${process.env.SERVER}/api/v1/student/auth/google/callback`
//         },
//             googleControl
//         ));


//         passport.serializeUser((user, done) => {
//             done(null, user);
//         });

//         passport.deserializeUser((User, done) => {
//             return done(null, User!);
//         });
//         this.githubOauth = passport.authenticate('github', { scope: ['profile', "email"] });
//         this.googleOauth = passport.authenticate("google", { scope: ["profile", "email"] });
//         this.linkedinOauth = passport.authenticate('linkedin', { scope: ["profile"] });

//         this.linkedinOauthCallback = passport.authenticate('linkedin', {
//             successReturnToOrRedirect: '/',
//             failureRedirect: '/login'
//         });

//         this.githubOauthCallback = passport.authenticate('github', {
//             successReturnToOrRedirect: '/',
//             failureRedirect: '/login'
//         });

//         this.googleOauthCallback = passport.authenticate('google', {
//             successReturnToOrRedirect: '/',
//             failureRedirect: '/login'
//         });
//     }
// }


