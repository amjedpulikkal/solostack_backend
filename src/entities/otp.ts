export interface IOtp {
    author:{
        email:string
        password:string
        name?:string
    };
    otp:Number;
    ex?:Date
}