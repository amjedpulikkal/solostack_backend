import { studentController } from "../../../../controllers/studentController"
import { StudentUsecase } from "../../../../usecases/studentUsecases"
import { OtpRepository } from "../../../mongodb/repository/OtpRepository"
import { OtpModel } from "../../../mongodb/model/otpSchema"
import { StudentRepository } from "../../../mongodb/repository/studentRepository"
import { Uuid } from "../../../services/uuid"
import { Nodemailer } from "../../../services/nodemailer"
import { Encrypt } from "../../../services/hashPassword"
import { Token } from "../../../services/token"

const studentRepo = new StudentRepository()
const uuid = new Uuid()
const otpRepository = new OtpRepository(OtpModel)
const nodemailer = new Nodemailer()
const hashPassword = new Encrypt()

const token = new Token()
// const passport = 
const studentUsecase = new StudentUsecase(
    studentRepo,
    otpRepository,
    uuid,
    nodemailer,
    hashPassword,
    token
)

console.log("fddfd");


export const studentCtrl = new studentController(studentUsecase)
