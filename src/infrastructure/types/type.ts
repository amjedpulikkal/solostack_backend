import Istudent from "@entities/student";
import {Imentor} from "@entities/mentor";

export type MailPayload = {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
};


interface User {
    _id: string;
    username: string;
    email: string;
    

}

export type JwtPayload={
    email:string,
    _id:string
}



export type ResponseObj={
    status:number;
    token?:string
    data:any
    

}


export type file = Express.Multer.File

