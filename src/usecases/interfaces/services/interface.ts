

export interface Iuuid{
    generateOTPFromUUID(): number ;

}


export interface InodeMailer{

    sendOtpToMail(payload: {from: string, to: string, subject: string ,text: string ,html: string }): Promise<boolean>


}