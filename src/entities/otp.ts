export interface IOtp {
    author:{
        email:string
        password:string
    };
    otp:Number;
    ex?:Date
}