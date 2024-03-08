
import Istudent from "../../../entities/studet";

import studentCollection from "../../mongodb/model/studentSchema"

import { IstudentRepository } from "../../../usecases/interfaces/repositroey/IstudentRepository";
import { singUpBodey } from "../../types/reqBodey";
export class StudentRepository implements IstudentRepository  {

    
    async ifUserExist(email: string): Promise<boolean> {
        const isExist = await studentCollection.findOne({ "personal_info.email": email })
        
        return isExist ? true : false
    }
    async newStudent(Singstudent: singUpBodey): Promise<Istudent> {

        const student:Istudent ={
            email: Singstudent.email,
            password: Singstudent.password,
            personal_info: {
                userName: "",
                name: "",
                age: 0,
                bio: "",
                photo: ""
            },
            wallet: 0,
            isBlocked: false
        }

        const newStudent = await studentCollection.create(student)
        return newStudent
    }

}