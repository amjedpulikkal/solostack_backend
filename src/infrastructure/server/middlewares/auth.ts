import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"



export const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies.jwtToken as string;


    if (!accessToken)
        return res.status(400).json("Access Token is invalid")

    const decode = (await jwt.verify(
        accessToken,
        process.env.jwtSecret as Secret
    )) as JwtPayload;
       
    if (!decode)
        return res.status(400).json("Access Token is invalid")

   
    req.user = decode
    console.log(decode)
    console.log("success from isAuth");
    next();
};