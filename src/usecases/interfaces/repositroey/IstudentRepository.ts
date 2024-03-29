import Istudent from "../../../entities/student"


import { singUpBody } from "../../../infrastructure/@types/reqBodey";

export interface IstudentRepository{
    ifUserExist(email:string):Promise<boolean>;
    newStudent(student:singUpBody):Promise<Istudent>;
    findUserWithEmail(email:string):Promise<Istudent>;
    upsertStudent(student: { email: string, name: string, password?: string, photos?: string }): Promise<Istudent>
    findById(_id:string):Promise<Istudent>
}

