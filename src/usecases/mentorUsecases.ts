
import { singUpBody } from "@infrastructure/@types/reqBodey";
import { Iotprepository } from "@interfaces/repositroey/IOtRepository";
import { Iuuid } from "@interfaces/services/interface";
import { InodeMailer } from "@interfaces/services/interface";
import { IHashpassword } from "@interfaces/services/interface";
import { Itoken } from "@interfaces/services/interface";
import { ImentorRepository } from "@interfaces/repositroey/ImentorRepository"
import { ImentorUseCases } from "@interfaces/ImentorUseCases";
import { OtpTemplate, forgetPasswordTemplate } from "../infrastructure/services/maileTamplate";
import { JwtPayload, ResponseObj } from "@infrastructure/@types/type";
import { Imentor } from "@entities/mentor";
export class MentorUseCases implements ImentorUseCases {
    private mailServes: InodeMailer;
    private mentorRepo: ImentorRepository;
    private otpRepository: Iotprepository;
    private uuid: Iuuid;
    private hashPassword: IHashpassword;
    private token: Itoken;
    constructor(
        mentorRepo: ImentorRepository,
        otpRepository: Iotprepository,
        uuid: Iuuid,
        nodeMailer: InodeMailer,
        hashPassword: IHashpassword,
        token: Itoken
    ) {
        this.otpRepository = otpRepository
        this.mentorRepo = mentorRepo
        this.uuid = uuid
        this.mailServes = nodeMailer
        this.hashPassword = hashPassword
        this.token = token
    }

    async createMentorAccount(mentor: singUpBody): Promise<ResponseObj> {

        const isExist = await this.mentorRepo.ifUserExist(mentor.email)
        console.log(isExist);

        if (isExist) {
            return {
                status: 409,
                data: "email is exist"
            }
        }

        const otp = this.uuid.generateOTPFromUUID()
        console.log(otp)
        const template = OtpTemplate(mentor.email, otp, mentor.name)

        await this.mailServes.sendOtpToMail(template)

        await this.otpRepository.createNewOtp(otp, mentor)

        return {
            status: 200,
            data: "otp sent"
        }

    }
    async verifyMentorAccount(email: string, otp: string): Promise<ResponseObj> {
        if (!email) {
            return { status: 403, data: "email is " }
        }

        const otpValid = await this.otpRepository.verifyOtp(email, otp) as singUpBody
        console.log("Otp-->", otpValid);
        if (!otpValid)
            return { status: 403, data: "otp not valid" }

        otpValid.password = await this.hashPassword.createHash(otpValid.password!)
        const mentor = await this.mentorRepo.newMentor(otpValid)
        console.log("ddd", mentor);
        console.log(typeof mentor);

        const token = this.token.singToken(mentor)

        return { status: 201, token, data: mentor }

    }
    async login(email: string, password: string): Promise<ResponseObj> {
        try {
            const user = await this.mentorRepo.findWithEmail(email);

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

            console.error("Error occurred during login:", error);
            return {
                status: 500,
                data: "Internal Server Error"
            };
        }
    }

    async updateAvailableTime(email: string, date: { date: Date, time: number[] }): Promise<ResponseObj> {

        const data = await this.mentorRepo.pushNewDate(email, date)

        return { data, status: 200 }
    }

    async getAvailableTime(mentor: Imentor, date: Date): Promise<ResponseObj> {

        console.log(date)

        const data = await this.mentorRepo.gatAvailableTimeWithDate(mentor._id, date)

        console.log("data",data)
       
        return { data, status: 200 }

    }
 account_info


}