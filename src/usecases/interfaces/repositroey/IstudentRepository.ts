import Istudent from "../../../entities/student"


import { singUpBody } from "../../../infrastructure/@types/reqBodey";

export interface IstudentRepository{
    ifUserExist(email:string):Promise<boolean>;
    newStudent(student:singUpBody):Promise<Istudent>;
    findWithEmail(email:string):Promise<Istudent>;
    upsertStudent(student: { email: string, name: string, password?: string, photos?: string }): Promise<Istudent>
    findById(_id:string):Promise<Istudent>
    updatePassword(_id:string,password:string)
    isUserNameExist(userName:string):Promise<Boolean>
    getAllStudents():Promise<Istudent[]> 
}

