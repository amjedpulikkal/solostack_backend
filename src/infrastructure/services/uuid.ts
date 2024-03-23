import { v4 as uuidv4 } from "uuid";
import { Iuuid } from "../../usecases/interfaces/services/interface";

export class Uuid implements Iuuid {
    generateOTPFromUUID(): number {
        const uuidValue = uuidv4();
        const uuidSubstring = uuidValue.substr(0, 8);
        const otpNumber = parseInt(uuidSubstring, 16);
    
        return otpNumber % 1000000;
    }
}
