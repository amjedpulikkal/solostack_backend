import Istudent from "../entities/student";
import { ErrorHandler } from "../infrastructure/server/middlewares/error";
import { req, res, next } from "../infrastructure/types/serverTypes";
import { IstudenUsecases } from "../usecases/interfaces/IstudentUsecases";
require("dotenv").config();
interface User {
  emails: any;
  provider: string;
}
interface AuthenticatedRequest extends Request {
  user?: User;
}

const statusCodes = {
  100: "Continue",
  101: "Switching Protocols",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  426: "Upgrade Required",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
};

export class studentController {
  private studentUsecase: IstudenUsecases;

  constructor(studentUsecase: IstudenUsecases) {
    this.studentUsecase = studentUsecase;
  }
  async createStudentAccount(req: req, res: res, next: next) {
    try {
      console.log(req.body);

      const data = await this.studentUsecase.createStudentAccount(req.body);
      if (data === 200) return res.status(201).json(true);

      if (data === 409) return res.status(409).json("Email already used");
    } catch (error) {
      console.log(error);

      next(new ErrorHandler());
    }
  }

  async verifyStudentAccount(req: req, res: res, next: next) {
    try {
      const { email, otp } = req.body;

      console.log(email, otp);

      const token = await this.studentUsecase.verifyStudentAccount(email, otp);
      if (token === 403) {
        res.status(403).json("otp not valid");
      } else {
        res.cookie("jwtToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 604800000,
          path: "/",
        });
        console.log(token);
        res.status(201).json(token);
      }
    } catch (error) {
      console.log(error);

      next(new ErrorHandler());
    }
  }

  async oauthSuccussControl(req: req, res: res, next: next) {
    try {
      const student = req.user as Istudent;
      console.log(student, "student----");

      const token = await this.studentUsecase.oauthSuccuss(student);
      console.log(token, "<=========>");
      res.redirect(
        `${process.env.CLIENT_SERVER}/oauth/${
          (req.user as User)?.provider
        }/${token}`
      );
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async isOauth(req: req, res: res, next: next) {
    try {
      console.log(req.cookies?.jwtToken, "token_______________dddd");
      const studentData = await this.studentUsecase.isOauth(
        req.cookies?.jwtToken
      );
      console.log("student", studentData);
      if (studentData) return res.status(200).json(studentData);

      return res.status(401).json(statusCodes[401]);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async signOut(req: req, res: res, next: next) {
    try {
      // @ts-ignore
      req.logout(function (err) {
        // if (err) { return next(err); }
        if (err) {
          console.log(err);
        } else {
          res.status(200).json("ok");
        }
      });
      // return res.redirect('/');
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async login(req: req, res: res, next: next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const data = await this.studentUsecase.login(email, password);
      console.log("dataRes", data);

      if (data.status === 200)
        return res
          .cookie("jwtToken", data?.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 604800000,
            path: "/",
          })
          .status(data.status)
          .json(data.data);

      return res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async forgetPassword(req: req, res: res, next: next) {
    try {
      const { email } = req.body;

      console.log(email);

      const data = await this.studentUsecase.forgetPassword(email);

      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async verifyForgetPassword(req: req, res: res, next: next) {
    try {
      const { token, password } = req.body;
      const data = await this.studentUsecase.verifyForgetPassword(
        token,
        password
      );
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async isUserNameExist(req: req, res: res, next: next) {
    try {
      const { userName } = req.body;
      const data = await this.studentUsecase.isUserNameExist(userName);
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async searchStudent(req: req, res: res, next: next) {
    try {
      const data = await this.studentUsecase.searchStudent();
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async getTodyReview(req: req, res: res, next: next) {
    try {
      const data = await this.studentUsecase.getTodyReview(req.user as {_id:string});

      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
}
