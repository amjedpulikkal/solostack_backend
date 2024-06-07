
import { singUpBody } from "@infrastructure/@types/reqBodey";
import { Iotprepository } from "@interfaces/repositroey/IOtRepository";
import { IAwsS2, Iuuid, ISharp } from "@interfaces/services/interface";
import { InodeMailer } from "@interfaces/services/interface";
import { IHashpassword } from "@interfaces/services/interface";
import { Itoken } from "@interfaces/services/interface";
import { ImentorRepository } from "@interfaces/repositroey/ImentorRepository"
import { ImentorUseCases } from "@interfaces/ImentorUseCases";
import { OtpTemplate, forgetPasswordTemplate } from "../infrastructure/services/maileTamplate";
import { JwtPayload, ResponseObj, file } from "@infrastructure/@types/type";
import { Imentor } from "@entities/mentor";
import { req } from "@infrastructure/@types/serverTypes";
import { IreviewTimeRepository,IreviewRepository } from "@interfaces/repositroey/IreviewRepository";
import { IReview } from "@entities/Ireview";


export class MentorUseCases implements ImentorUseCases {
    private mailServes: InodeMailer;
    private mentorRepo: ImentorRepository;
    private otpRepository: Iotprepository;
    private uuid: Iuuid;
    private hashPassword: IHashpassword;
    private token: Itoken;
    private staticFile: IAwsS2;
    private imageResize: ISharp;
    private reviewTimeRepository: IreviewTimeRepository;
    private reviewRepository: IreviewRepository;
    constructor(
        mentorRepo: ImentorRepository,
        reviewTimeRepo:IreviewTimeRepository ,
        otpRepository: Iotprepository,
        uuid: Iuuid,
        nodeMailer: InodeMailer,
        hashPassword: IHashpassword,
        token: Itoken,
        staticFile: IAwsS2,
        sharp: ISharp,
        reviewRepository:IreviewRepository
    ) {
        this.otpRepository = otpRepository
        this.reviewTimeRepository = reviewTimeRepo
        this.mentorRepo = mentorRepo
        this.uuid = uuid
        this.mailServes = nodeMailer
        this.hashPassword = hashPassword
        this.token = token
        this.staticFile = staticFile
        this.imageResize = sharp
        this.reviewRepository = reviewRepository
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
        const template = OtpTemplate(mentor.email, otp, mentor.userName)

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
        console.log("Otp-------------->", otpValid);
        if (!otpValid)
            return { status: 403, data: "otp not valid" }

        otpValid.password = await this.hashPassword.createHash(otpValid.password!)
        const mentor = await this.mentorRepo.newMentor(otpValid)
        console.log("ddd", mentor);
        console.log(typeof mentor);

        const token = this.token.singToken(mentor)

        return { status: 201, token, data: mentor }

    }
    async login(email: string, password: string,): Promise<ResponseObj> {
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

    async updateAvailableTime(mentor: Imentor, date: { date: Date, time: number[] }): Promise<ResponseObj> {
        console.log(date)
        const data = await this.reviewTimeRepository.createNewReview(date.date,date.time,mentor._id)

        return { data, status: 200 }
    }

    async getAvailableTime(mentor: Imentor, date: Date): Promise<ResponseObj> {
        console.log(date,"------------")

        const data = await this.reviewTimeRepository.getAvailableTime(mentor._id, date)

        // console.log("data", data)
        // console.table(data)

        return { data, status: 200 }


    }
    async getAllMentorAvailableTime(date:Date,time:number): Promise<ResponseObj>{

        console.log(date,"------date------")

        const data = await this.reviewTimeRepository.getAllMentorAvailableTime(date,time)

        console.log(data)

        return { data, status: 200 }




    }
    async getAllMentors(date: Date): Promise<ResponseObj> {
        if (date) {

              const allMentors = await this.reviewTimeRepository.getAllMentorsWithDate(date)
            console.log("allMentors",allMentors)

            return { data: allMentors, status: 200 }

        } else {

            const allMentors = await this.mentorRepo.getAllMentors()


            return { data: allMentors, status: 200 }
        }
    }
    async getMentorProfile(userName: string): Promise<ResponseObj> {


        const data = await this.mentorRepo.getMentorProfile(userName)
        if (data)
            return { data, status: 200 }

        return { data, status: 400 }
    }

    async updateProfilePhoto(mentor: Imentor, file: file): Promise<ResponseObj> {
        console.log(file)

        file.buffer = await this.imageResize.resizeImage(file.buffer, 460, 460)
        const imagePath = await this.staticFile.uploadFile(file.buffer, file.originalname)

        if (imagePath && imagePath !== true) {
            const data = await this.mentorRepo.updateUserPhoto(mentor._id, imagePath)
            data.personal_info.photo = imagePath
            delete data.password
            return { data, status: 200 }
        } else {
            return { data: "", status: 500 }
        }


    }

    async storeRequest({data,mentorRVId,user}): Promise<ResponseObj> {

                    
         const resData = await  this.reviewTimeRepository.storeRequest(data,mentorRVId,user._id)
        return {data:resData,status:200}
    }

    async searchMentor():Promise<ResponseObj>{

        const resData = await this.mentorRepo.getAllMentors()
        return {data:resData,status:200}
        
    } 

    async  acceptRequest({reviewTime,studentID}:{reviewTime:IReview,studentID:string}): Promise<ResponseObj> {
      console.log(studentID)
      const reviewCl =  await  this.reviewRepository.createNewReview(reviewTime,studentID)
      console.log(reviewCl,"-----2---")
      const data = await this.reviewTimeRepository.updateReviewTime(reviewCl._id,reviewTime._id)
      console.log(data)
      return {status:200,data}
        
    }

}

