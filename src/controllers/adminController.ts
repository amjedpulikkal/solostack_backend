
import { ErrorHandler } from "@infrastructure/server/middlewares/error";
import { req, res, next } from "../infrastructure/@types/serverTypes"



export class adminController {
     private adminUseCases 
     constructor(
        adminUseCases
     ){
        this.adminUseCases = adminUseCases
     }

    signUpAdmin(req: req, res: res, next: next) {

        try {
            const { email, password } = req.body
            console.log(email, password);

            const data = await this.adminUseCases.login(email, password)
     
            if (data.status === 200)
                return res.cookie('jwtToken', data?.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 604800000,
                    path: '/',
                }).status(data.status).json(data.data);

            return res.status(data.status).json(data.data)

        } catch (error) {
            console.log(error);
            next(new ErrorHandler())

        }
    }

}