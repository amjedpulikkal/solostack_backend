
// import { ErrorHandler } from "@infrastructure/server/middlewares/error"; 
import { req, res, next } from "../infrastructure/types/serverTypes"
import { IadminUseCases } from "@interfaces/IadminUseCases";



export class AdminController {
     private adminUseCases:IadminUseCases 
     constructor(
        adminUseCases:IadminUseCases
     ){
        this.adminUseCases = adminUseCases
     }

   async signUpAdmin(req: req, res: res, next: next) {

        try {
            const reqData:{email:string, password:string } = req.body
   

            const data = await this.adminUseCases.login(reqData)
     
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
            // next(new ErrorHandler(error))

        }
    }

}