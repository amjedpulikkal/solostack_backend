import { IstudentRepository } from "./interfaces/repositroey/IstudentRepository"

import Istudent from "@entities/student";
import { singUpBody } from "@infrastructure/@types/reqBodey";
import { IstudenUsecases } from "@interfaces/IstudentUsecases";
import { Iotprepository } from "@interfaces/repositroey/IOtRepository";
import { Iuuid } from "@interfaces/services/interface";
import { InodeMailer } from "@interfaces/services/interface";
import { IHashpassword } from "@interfaces/services/interface";
import { Itoken } from "@interfaces/services/interface";
// import { OtpTemplate } from "./ infrastructure/services/maileTamplate";
import { OtpTemplate } from "../infrastructure/services/maileTamplate";
import { JwtPayload, ResponseObj } from "@infrastructure/@types/type";


// class statusCode {

//     constructor(data,stat){

//     }

// }


export class StudentUsecase implements IstudenUsecases {
    private mailServes: InodeMailer;
    private studentRepo: IstudentRepository;
    private otpRepository: Iotprepository;
    private uuid: Iuuid;
    private hashPassword: IHashpassword;
    private token: Itoken;
    constructor(
        studentRepo: IstudentRepository,
        otpRepository: Iotprepository,
        uuid: Iuuid,
        nodeMailer: InodeMailer,
        hashPassword: IHashpassword,
        token: Itoken
    ) {
        this.otpRepository = otpRepository
        this.studentRepo = studentRepo
        this.uuid = uuid
        this.mailServes = nodeMailer
        this.hashPassword = hashPassword
        this.token = token
    }


    async createStudentAccount(student: singUpBody): Promise<number> {

        const isExist = await this.studentRepo.ifUserExist(student.email)
        console.log(isExist);

        if (isExist) {
            return 409
        }

        const otp = this.uuid.generateOTPFromUUID()
        console.log(otp)
        const template = OtpTemplate(student.email, otp, student.name)
        await this.mailServes.sendOtpToMail(template)

        await this.otpRepository.createNewOtp(otp, student)


        return 200

    }
    async verifyStudentAccount(email: string, otp: string): Promise<string | number> {
        if (!email) {
            return ""
        }

        const otpValid = await this.otpRepository.verifyOtp(email, otp) as singUpBody
        console.log(otpValid);
        if (!otpValid)
            return 403

        otpValid.password = await this.hashPassword.createHash(otpValid.password!)
        const student = await this.studentRepo.newStudent(otpValid)
        console.log("ddd", student);
        console.log(typeof student);

        const token = this.token.singToken(student)

        return token

    }

    async oauthSuccuss(user: Istudent): Promise<string> {

        const payload = {
            email: user.email
            , _id: user._id!
        }
        const token = this.token.singToken(payload)
        return token
    }
    async isOauth(token: string): Promise<Istudent | boolean> {



        const data = this.token.verifyJwtToken(token) as JwtPayload
        console.log(data);

        if (data) {

            const studentData = await this.studentRepo.findById(data._id)
            studentData.password = ""
            return studentData
        }
        return false

    }

    async login(email: string, password: string): Promise<ResponseObj> {
        try {
            const user = await this.studentRepo.findUserWithEmail(email);

            if (!user) {
                return {
                    status: 403,
                    data: "User with the provided email not found"
                };
            }

            const isPasswordCorrect = await this.hashPassword.comparePassword(password, user.password);

            if (!isPasswordCorrect) {
                return {
                    status: 403,
                    data: "Incorrect password"
                };
            }

            const token = this.token.singToken(user);

            return {
                status: 200,
                data: user,
                token

            };
        } catch (error) {
            // Handle errors (e.g., database errors, hashing errors, etc.)
            console.error("Error occurred during login:", error);
            return {
                status: 500,
                data: "Internal Server Error"
            };
        }
    }



}

