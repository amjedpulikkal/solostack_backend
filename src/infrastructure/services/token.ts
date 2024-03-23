require("dotenv").config();
import jwt from "jsonwebtoken"
import Istudent from "../../entities/student";
// import { JwtPayload } from "jsonwebtoken";
import { JwtPayload } from "../@types/type";
const secretKey = process.env.jwtSecret !
import { Itoken  } from "../../usecases/interfaces/services/interface";
export class Token implements Itoken{
    

    singToken(payload:Istudent|{email:string,_id:string}):string{
        const payloadObject = {
            _id: payload._id ,
            email:payload.email
           
        };
        const token = jwt.sign(payloadObject, secretKey, { expiresIn: '7d' });
        console.log('Generated JWT:', token);
        return token
    }
    verifyJwtToken(token:string):JwtPayload|boolean{
        try {
            return jwt.verify(token,secretKey) as JwtPayload
        } catch (error) {
            return false
        }

    }
}

