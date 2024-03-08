import Istudent from "../../../entities/studet"


import { singUpBodey } from "../../../infrastructure/types/reqBodey";

export interface IstudentRepository{
    ifUserExist(email:string):Promise<boolean>;
    newStudent(student:singUpBodey):Promise<Istudent>;

}

