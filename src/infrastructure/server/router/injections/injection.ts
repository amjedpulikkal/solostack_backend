import { studentController } from "../../../../controllers/studentController"
import { StudentUsecase } from "../../../../usecases/studentUsecases"
import { OtpRepository } from "../../../mongodb/repository/OtpRepository"
import { OtpModel } from "../../../mongodb/model/otpSchema"
import { StudentRepository } from "../../../mongodb/repository/studentRepository"
import { Uuid } from "../../../services/uuid"
import { Nodemailer } from "../../../services/nodemailer"
import { Encrypt } from "../../../services/hashPassword"
import { Token } from "../../../services/token"
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
const studentUsecase = new StudentUsecase(
    studentRepo,
    otpRepository,
    uuid,
    nodemailer,
    hashPassword,
    token,
    staticFile,
    reviewRepository
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
    reviewRepository

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
