import { req, res } from "../infrastructure/types/serverTypes"
import { IstudenUsecases } from "../usecases/interfaces/IstudentUsecases"
export class studentController {

    private studentUsecase: IstudenUsecases

    constructor(studentUsecase: IstudenUsecases) {
        this.studentUsecase = studentUsecase
    }
    async createStudentAccount(req: req, res: res) {
        console.log(req.body);
        
        this.studentUsecase.createStudentAccount(req.body).then((data) => {
            if(data){

                res.status(201).json(true)
            }else{
                
                res.status(500).json(false)
            }
        })


    }

}



