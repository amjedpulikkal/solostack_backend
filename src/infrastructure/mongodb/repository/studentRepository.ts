
import Istudent from "../../../entities/student";

import studentCollection from "../../mongodb/model/studentSchema"

import { IstudentRepository } from "../../../usecases/interfaces/repositroey/IstudentRepository";
// import { singUpBody } from "../../types/reqBodey";
export class StudentRepository implements IstudentRepository {


    async ifUserExist(email: string): Promise<boolean> {
        const isExist = await studentCollection.findOne({ email })

        return isExist ? true : false
    }
    async newStudent(student: { email: string, name: string, password?: string, photos?: string }): Promise<Istudent> {

        const Student: Istudent = {
            email: student.email,
            password: student.password || "",
            personal_info: {
                userName: "",
                name: student.name,
                age: 0,
                bio: "",
                photo: student.photos || ""
            },
            wallet: 0,
            isBlocked: false
        }

        const newStudent = await studentCollection.create(Student)
        return newStudent
    }
    async upsertStudent(student: { email: string, name: string, password?: string, photos?: string }): Promise<Istudent> {

        const Student = {
            email: student.email,
            password: student.password || "",
            personal_info: {
                userName: "",
                name: student.name,
                age: 0,
                bio: "",
                photo: student.photos || ""
            },
            wallet: 0,
            isBlocked: false
        }
        const newStudent = await studentCollection.findOneAndUpdate(
            { email: student.email },
            { $set: Student }, 
            { upsert: true, new: true }
        );
        return newStudent
    }

    async findWithEmail(email: string): Promise<Istudent> {

        const student = await studentCollection.findOne({ email })

        return student!
    }

    async findById(_id:string):Promise<Istudent> {
        return await studentCollection.findById(_id) as Istudent
    }
    async updatePassword(_id:string,password:string){
        return await studentCollection.findByIdAndUpdate(_id,{$set:{password}})

    }

}