import { IstudentRepository } from "./interfaces/repositroey/IstudentRepository"

import Istudent from "../entities/studet";
import { singUpBodey } from "../infrastructure/types/reqBodey";
import { IstudenUsecases } from "./interfaces/IstudentUsecases";
import { Iotprepository } from "./interfaces/repositroey/IOtRepository";
import { Iuuid } from "./interfaces/services/interface";
export class StudentUsecase implements IstudenUsecases {
    private studentRepo: IstudentRepository;
    private otpRepository:Iotprepository;
    private uuid :Iuuid
    constructor(
        studentRepo: IstudentRepository,
        otpRepository:Iotprepository,
        uuid:Iuuid
    ) {
        this.otpRepository = otpRepository
        this.studentRepo = studentRepo
        this.uuid =uuid
    }

    
    async createStudentAccount(student: singUpBodey): Promise<boolean|string> {
 
           const isExist = await this.studentRepo.ifUserExist(student.email)
           if (isExist) {
               return ""
           }
   
           const otp = this.uuid.generateOTPFromUUID()
           console.log(otp)
   
           await this.otpRepository.createNewOtp(otp,student)
   
           return true
      
    }

}