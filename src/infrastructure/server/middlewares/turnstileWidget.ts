
import { req, res, next } from "@infrastructure/@types/serverTypes"
export function WidgetValidation(req: req, res: res, next: next) {

    console.log("sssss")
    const SECRET_KEY = '0x4AAAAAAAXYCCNApghnukiY8A86ftKNaYI';

    (async function handlePost(req: req) {

        const { token } = req.body;;
        const ip = req.ip

        console.log("sssss", token, ip)

        let formData = new FormData();
        formData.append('secret', SECRET_KEY);
        formData.append('response', token);
        formData.append('remoteip', ip);

        const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
        const result = await fetch(url, {
            body: formData,
            method: 'POST',
        });

        const outcome = await result.json();
        console.log(outcome)
        if (outcome.success) {
            next()
        }else{
            res.status(400).json("your not a human")
        }
    })(req)


}