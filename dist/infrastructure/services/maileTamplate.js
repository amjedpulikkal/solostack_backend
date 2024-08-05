"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpTemplate = OtpTemplate;
exports.forgetPasswordTemplate = forgetPasswordTemplate;
require("dotenv").config();
function OtpTemplate(userEmail, otp, name) {
    console.log("email");
    console.log(userEmail);
    const mail = {
        from: "solostack00@gmail.com",
        to: userEmail,
        subject: "Hello from SoloStack",
        text: "This is a test email sent using Nodemailer.",
        html: `
  <body><div style="background-color:#f6f6f6;margin:0">
<table style="font-family:'akzidenz' , 'helvetica' , 'arial' , sans-serif;font-size:14px;color:#5e5e5e;width:98%;max-width:600px;float:none;margin:0 auto" border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
  <tbody>
    <tr align="left">
    <td style="padding-top:36px;padding-bottom:22px" align="center"><img src="https://github.com/amjedpulikkal/solostack_frontend/blob/main/public/SoloStack%20(1).png?raw=true" height="35" width="140" /></td>
    </tr>
    <tr bgcolor="#ffffff">
      <td>
        <table bgcolor="#ffffff" style="width:100%;line-height:20px;padding:32px;border:1px solid;border-color:#f0f0f0" cellpadding="0">
          <tbody>
            <tr>
              <td style="color:#3d4f58;font-size:24px;font-weight:bold;line-height:28px">Action Required: One-Time Verification Code</td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px">Hi ${name},</td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px">You are receiving this email because a request was made for a one-time code that can be used for authentication.</td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px">Please enter the following code for verification:</td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px" align="center"><span id="verification-code" style="font-size:18px"></span></td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:50px;color: #28CB8B; letter-spacing: 20px;">${otp}</td>
            </tr>              
            <tr>
              <td style="padding-top:24px;font-size:16px" align="center"><span id="verification-code" style="font-size:18px"></span></td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px">This verification code will expire in 5 minutes.</td>
            </tr>
            <tr>
              <td style="padding-top:24px;font-size:16px">Thanks for using our service !</td>
            </tr>              
          </tbody>
        </table></td>
    </tr>
  </tbody>
</table>
</div></body>`
    };
    return mail;
}
function forgetPasswordTemplate(userEmail, name, token) {
    console.log("email");
    console.log(userEmail);
    const resetUrl = `${process.env.CLIENT_SERVER_verify_forget_password_url}/${token}`;
    const mail = {
        from: "solostack00@gmail.com",
        to: userEmail,
        subject: "Hello from SoloStack",
        text: "This is a test email sent using Nodemailer.",
        html: `
      <body>
  <div style="background-color:#f6f6f6;margin:0">
    <table style="font-family:'akzidenz', 'helvetica', 'arial', sans-serif;font-size:14px;color:#5e5e5e;width:98%;max-width:600px;float:none;margin:0 auto" border="0" cellpadding="0" cellspacing="0" valign="top" align="left">
      <tbody>
        <tr align="left">
          <td style="padding-top:36px;padding-bottom:22px" align="center"><img src="https://github.com/amjedpulikkal/solostack_frontend/blob/main/public/SoloStack%20(1).png?raw=true" height="35" width="140" /></td>
        </tr>
        <tr bgcolor="#ffffff">
          <td>
            <table bgcolor="#ffffff" style="width:100%;line-height:20px;padding:32px;border:1px solid;border-color:#f0f0f0" cellpadding="0">
              <tbody>
                <tr>
                  <td style="color:#3d4f58;font-size:24px;font-weight:bold;line-height:28px">Password Reset Request</td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">Hi ${name},</td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">You are receiving this email because you requested to reset your password.</td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">Please click the button below to reset your password:</td>
                </tr>
                <tr>
                  <td style="padding-top:24px" align="center">
                    <a href="${resetUrl}" style="display: inline-block;background-color: #28CB8B;color: #ffffff;padding: 12px 24px;text-decoration: none;border-radius: 4px;font-size: 16px;font-weight: bold;">Reset Password</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">If you didn't request a password reset, you can safely ignore this email.</td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">This link is valid for 24 hours.</td>
                </tr>
                <tr>
                  <td style="padding-top:24px;font-size:16px">Thanks for using our service!</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
`
    };
    return mail;
}
