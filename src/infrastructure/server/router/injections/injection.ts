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
import { ReviewRepository } from "../../../../infrastructure/mongodb/repository/reviewRepository"
import { reviewModel } from "../../../../infrastructure/mongodb/model/reviewSchema"

const studentRepo = new StudentRepository()
const uuid = new Uuid()
const otpRepository = new OtpRepository(OtpModel)
const reviewRepository =new ReviewRepository(reviewModel)
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
    staticFile
    
)

const mentorRepository = new MentorRepository()

const mentorUseCases = new MentorUseCases(
    mentorRepository,
    reviewRepository,
    otpRepository,
    uuid,
    nodemailer,
    hashPassword,
    token,
    staticFile,
    sharp

)

export const mentorCtrl = new Mentor(mentorUseCases)
export const studentCtrl = new studentController(studentUsecase)
