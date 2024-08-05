

import { studentController } from "../../../../controllers/studentController"
import { StudentUsecase } from "../../../../usecases/studentUsecases"
import { OtpRepository } from "../../../mongodb/repository/OtpRepository"
import { OtpModel } from "../../../mongodb/model/otpSchema"
import paymentHistorySchema from "../../../mongodb/model/paymentHistorySchema"

import { StudentRepository } from "../../../mongodb/repository/studentRepository"
import { Uuid } from "../../../services/uuid"
import { Nodemailer } from "../../../services/nodemailer"
import { Encrypt } from "../../../services/hashPassword"
import { Token } from "../../../services/token"
import {StripeServices}from "../../../services/stripe"
import Mentor from "../../../../controllers/mentorController"
import { MentorUseCases } from "../../../../usecases/mentorUsecases"
import { MentorRepository } from "../../../../infrastructure/mongodb/repository/mentorRepository"
import { AwsS3 } from "../../../../infrastructure/services/aws/s3"
import { Sharp } from "../../../../infrastructure/services/imageResize "
import { ReviewRepository as ReviewTimeRepository  } from "../../../mongodb/repository/reviewTimeRepository"
import { ReviewRepository  } from "../../../mongodb/repository/reiewRepository"
import { reviewModel as reviewTimeModel  } from "../../../mongodb/model/reviewTimeSchema"
import { reviewModel  } from "../../../mongodb/model/reviewSchema"

import { chatGroupUseCases } from "../../../../usecases/chatUseCases"
import { chatGroupRepo } from "../../../../infrastructure/mongodb/repository/chatGroupRepository"
import { chatMessageRepository } from "../../../mongodb/repository/chatMessageRepository"

import { chatGroup } from "../../../../controllers/chatGroupController"

import { ISocket } from "@interfaces/services/interface"

import { RedisDb } from "../../../../infrastructure/services/redis";
import { StripeUseCases } from "../../../../usecases/stripeUseCases"
import {StripeController} from "../../../../controllers/stripe"
import { PaymentHistoryRepository } from "../../../../infrastructure/mongodb/repository/paymentHistoryRepository"
import { ExchangeRate } from "../../../../infrastructure/services/exchangeRate"
import { socketEmitEventToUser } from "../../../../infrastructure/services/socketIo"
// import { emitEventToUser } from "@infrastructure/services/socketIo"
console.log(socketEmitEventToUser)
export const connectedUserSockets = new Map<string,ISocket>()
console.log(connectedUserSockets,"-------")

const studentRepo = new StudentRepository() 
const uuid = new Uuid()
const otpRepository = new OtpRepository(OtpModel)
const reviewTimeRepository =new ReviewTimeRepository(reviewTimeModel)

const reviewRepository  = new ReviewRepository(reviewModel)
const nodemailer = new Nodemailer()
const hashPassword = new Encrypt()
const staticFile = new AwsS3()
const token = new Token()
const sharp = new Sharp()
const stripeServices =new StripeServices() 
export const redisDb= new RedisDb()
const exchangeRate = new ExchangeRate()
const paymentHistoryRepository = new PaymentHistoryRepository(paymentHistorySchema)

const stripeUseCases = new StripeUseCases(stripeServices,paymentHistoryRepository,studentRepo,exchangeRate)
const studentUsecase = new StudentUsecase(
    studentRepo,
    otpRepository,
    uuid,
    nodemailer,
    hashPassword,
    token,
    staticFile,
    reviewRepository,
    redisDb
)

const mentorRepository = new MentorRepository()

const mentorUseCases = new MentorUseCases(
    mentorRepository,
    reviewTimeRepository,
    otpRepository,
    uuid,
    nodemailer,
    hashPassword,
    token,
    staticFile,
    sharp,
    reviewRepository,
    redisDb,
    socketEmitEventToUser

)

const ChatGroupRepo = new chatGroupRepo()
const chatMessageRepo = new chatMessageRepository()
export const ChatGroupUseCases  = new chatGroupUseCases(
    ChatGroupRepo,
    chatMessageRepo,
    staticFile,
    sharp
)



export const chatCtrl = new chatGroup(ChatGroupUseCases)
export const mentorCtrl = new Mentor(mentorUseCases)
export const studentCtrl = new studentController(studentUsecase)
export const stripeController = new StripeController(stripeUseCases)

