import { singUpBody } from "../../../infrastructure/@types/reqBodey";
import { Imentor } from "@entities/mentor";
export interface ImentorRepository{
    ifUserExist(email:string):Promise<boolean>;
    newMentor(student:singUpBody):Promise<Imentor>;
    findWithEmail(email: string): Promise<Imentor>;
    pushNewDate(email: string, {date,time}:{date:Date,time:number[]}):Promise<Imentor>
    gatAvailableTimeWithDate(_id:string, date:Date):Promise<{date:Date,time:Number[]}>
}

