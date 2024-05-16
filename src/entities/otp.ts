export interface IOtp {
    author:{
        email:string
        password:string
        userName?:string
    };
    otp:Number;
    ex?:Date
}