// process.loadEnvFile()

require("dotenv").config();
import express, { Express } from "express";
import cors from "cors"
import helmet from "helmet";
import morgan from "morgan"
import cookieParser from "cookie-parser"
import studentRouter from "../router/studentRouter"
import mentorRouter from "../router/mentorRouter"
import groupChatRouter from "../router/chatRouter"
import stripeRouter from "../router/stripeRouter"
import session from 'express-session'
import passport from 'passport'
import { router } from 'bull-board'

const app: Express = express()
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 
    }
}));
app.use(passport.initialize());
app.use(passport.session())
app.use('/webhook', express.raw({type: 'application/json'}));
app.use(cors({  origin: process.env.CLIENT_SERVER, credentials: true }))
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false,
  }));
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/student', studentRouter)
app.use('/api/v1/mentor', mentorRouter)
app.use('/api/v1/group-chat',groupChatRouter)
app.use("/",stripeRouter)
app.use('/admin/queues', router);


export default app