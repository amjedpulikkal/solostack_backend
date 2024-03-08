import { studentController } from "../../../../controllers/studentController"
import { StudentUsecase } from "../../../../usecases/studentUsecases"
import { OtpRepository } from "../../../mongodb/repository/OtpRepository"
import {OtpModel} from "../../../mongodb/model/otpSchema"
import {StudentRepository} from "../../../mongodb/repository/studentRepository"
import {Uuid} from "../../../services/uuid"

const studentRepo = new StudentRepository()
const uuid = new Uuid()
const otpRepository = new OtpRepository(OtpModel)
const studentUsecase = new StudentUsecase(studentRepo,otpRepository,uuid)

console.log("fddfd");


export const studentCtrl = new studentController(studentUsecase)
