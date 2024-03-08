
import Istudent from "../../entities/studet"
import { singUpBodey } from "../../infrastructure/types/reqBodey";
export interface IstudenUsecases{

    createStudentAccount(user:singUpBodey): Promise<boolean|string>;

}