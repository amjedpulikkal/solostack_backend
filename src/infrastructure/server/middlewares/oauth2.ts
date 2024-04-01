import { Response, Request, NextFunction } from "express";
import passport from "passport"
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2'
import { Strategy as linkedStrategy, Profile as LinkedInProfile } from 'passport-linkedin-oauth2'
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20'
import { StudentRepository } from "../../mongodb/repository/studentRepository"
import { Token } from "../../services/token";
const db = new StudentRepository()
const token = new Token()
require("dotenv").config();

// interface PassportResponse {
//      (
//          accessToken: string,
//          refreshToken: string,
//          profile: GitHubProfile | LinkedInProfile | GoogleProfile,
//          done: (error: any, user?: any) => void
//      )
// }
async function PassportResponse(accessToken: string, refreshToken: string, profile: GitHubProfile | LinkedInProfile | GoogleProfile, done: (arg0: null, arg1: any) => any) {
    console.log(accessToken, "          ", refreshToken);

    process.nextTick(async function () {
        console.log(accessToken, refreshToken,);

        if (profile.provider === "google") {

        }
        const isExist = await db.findWithEmail(profile.emails?.[0]?.value!);
        console.log(isExist);
        console.log(`---------------${profile.provider}--------------------`);
        console.log(profile);
        console.log(`---------------${profile.provider}--------------------`);
        if (!isExist) {
            const Student = {
                email: profile.emails?.[0]?.value!,
                name: profile.displayName,
                photos: profile.photos?.[0]?.value!
            }
            console.log(Student);
            
            const student = await db.newStudent(Student)
            return done(null, student);
        }
        return done(null, isExist);
    });
}

passport.use(new GitHubStrategy({
    clientID: process.env.gitHubClintId!,
    clientSecret: process.env.gitHubsecret!,
    callbackURL: `${process.env.SERVER}/api/v1/student/auth/github/callback`
},
    PassportResponse));

passport.use(new linkedStrategy({
    clientID: process.env.linkedinClintId!,
    clientSecret: process.env.linkedinSecret!,
    callbackURL: `${process.env.SERVER}/api/v1/student/auth/linkedin/callback`
},
    PassportResponse));

passport.use(new GoogleStrategy({
    clientID: process.env.googleClintId!,
    clientSecret: process.env.googleSecret!,
    callbackURL: `${process.env.SERVER}/api/v1/student/auth/google/callback`
},
    PassportResponse));


export const githubOauth = passport.authenticate('github', { scope: ["user:email"] })
export const googleOauth = passport.authenticate("google", { scope: ["profile", "email"] })
export const linkedinOauth = passport.authenticate('linkedin', { scope: ['profile', "email"] })


export const linkedinOauthCallback = passport.authenticate('linkedin', {
    failureRedirect: '/login'
})
export const githubOauthCallback = passport.authenticate('github', {
    failureRedirect: '/login'
})
export const googleOauthCallback = passport.authenticate('google', {
    failureRedirect: '/login'
})

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (User, done) {
    return done(null, User!);
});

