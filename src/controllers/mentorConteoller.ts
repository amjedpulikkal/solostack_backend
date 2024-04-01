import { ImentorUseCases } from "@interfaces/ImentorUseCases"
import { req, res, next } from "../infrastructure/@types/serverTypes"
import { ErrorHandler } from "../infrastructure/server/middlewares/error";
import { Imentor } from "@entities/mentor";


export default class MentorController {
    private mentorUseCases: ImentorUseCases


    constructor(mentorUseCases: ImentorUseCases) {
        this.mentorUseCases = mentorUseCases
    }

    async createMentorAccount(req: req, res: res, next: next) {
        try {

            console.log(req.body);

            const data = await this.mentorUseCases.createMentorAccount(req.body)

            return res.status(data.status).json(data.data)


        } catch (error) {

            console.log(error);

            next(new ErrorHandler())

        }


    }
    async verifyStudentAccount(req: req, res: res, next: next) {

        try {
            const { email, otp } = req.body

            console.log(email, otp);

            const data = await this.mentorUseCases.verifyMentorAccount(email, otp)
            if (data.status === 201) {

                res.cookie('jwtToken', data.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 3600000,
                    path: '/',
                });
                console.log(data);
                return res.status(data.status).json(data.data)

            }
            return res.status(data.status).json(data.data)

        } catch (error) {
            console.log(error);

            next(new ErrorHandler())


        }

    }
    async login(req: req, res: res, next: next,) {

        try {
            const { email, password } = req.body
            console.log(email, password);

            const data = await this.mentorUseCases.login(email, password)
            console.log("dataRes", data);

            if (data.status === 200)
                return res.cookie('jwtToken', data?.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 3600000,
                    path: '/',
                }).status(data.status).json(data.data);

            return res.status(data.status).json(data.data)

        } catch (error) {
            console.log(error);
            next(new ErrorHandler())

        }

    }

    async updateAvailableTime(req: req, res: res, next: next) {

        try {

            const { date, time } = req.body

            const user = req.user as Imentor

            console.log(user)
            const data = await this.mentorUseCases.updateAvailableTime(user?.email, { date, time })


            res.status(data.status).json(data.data)

        } catch (error) {
            console.log(error);
            next(new ErrorHandler())

        }
    }

    async getAvailableTime(req: req, res: res, next: next) {

        try {
            const { date } = req.body
            console.log(req.body)
            const user = req.user as Imentor
            const data = await this.mentorUseCases.getAvailableTime(user, date)
            console.log(date,data)
            res.status(data.status).json(data.data)


        } catch (error) {
            console.log(error);
            next(new ErrorHandler())
        }

    }






}