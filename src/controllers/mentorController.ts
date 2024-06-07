import { ImentorUseCases } from "@interfaces/ImentorUseCases";
import { req, res, next } from "../infrastructure/@types/serverTypes";
import { ErrorHandler } from "../infrastructure/server/middlewares/error";
import { Imentor } from "@entities/mentor";

export default class MentorController {
  private mentorUseCases: ImentorUseCases;

  constructor(mentorUseCases: ImentorUseCases) {
    this.mentorUseCases = mentorUseCases;
  }

  async createMentorAccount(req: req, res: res, next: next) {
    try {
      console.log(req.body);

      const data = await this.mentorUseCases.createMentorAccount(req.body);

      return res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);

      next(new ErrorHandler());
    }
  }
  async verifyStudentAccount(req: req, res: res, next: next) {
    try {
      const { email, otp } = req.body;

      console.log(email, otp);

      const data = await this.mentorUseCases.verifyMentorAccount(email, otp);
      if (data.status === 201) {
        res.cookie("jwtToken", data.token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 604800000,
          path: "/",
        });
        console.log(data);
        return res.status(data.status).json(data.data);
      }
      return res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);

      next(new ErrorHandler());
    }
  }
  async login(req: req, res: res, next: next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);

      const data = await this.mentorUseCases.login(email, password);
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

  async updateAvailableTime(req: req, res: res, next: next) {
    try {
      const { date, time } = req.body;

      const user = req.user as Imentor;

      console.log(user);
      const data = await this.mentorUseCases.updateAvailableTime(user, {
        date,
        time,
      });

      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async getAllAvailableTime(req: req, res: res, next: next) {
    try {
      const { date, time } = req.body;

      const data = await this.mentorUseCases.getAllMentorAvailableTime(
        date,
        time
      );
      // console.log(date, data)
      res.status(data.status).json(data.data);
    } catch (error) {
      console.error(error);
      next(new ErrorHandler());
    }
  }

  async getAvailableTime(req: req, res: res, next: next) {
    try {
      const { date } = req.body;
      console.log(req.body);
      const user = req.user as Imentor;

      const data = await this.mentorUseCases.getAvailableTime(user, date);
      // console.log(date, data)
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async getAllMentors(req: req, res: res, next: next) {
    try {
      const { date } = req.body;
      const data = await this.mentorUseCases.getAllMentors(date);
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
  async getMentorProfile(req: req, res: res, next: next) {
    try {
      const { userName } = req.body;
      console.log(userName);
      const data = await this.mentorUseCases.getMentorProfile(userName);
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async updateMentorProfilePhoto(req: req, res: res, next: next) {
    try {
      const user = req.user as Imentor;
      console.log(user);
      const data = await this.mentorUseCases.updateProfilePhoto(user, req.file);
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async storeRequest(req: req, res: res, next: next) {
    try {
      console.log(req.body);

      const data = await this.mentorUseCases.storeRequest({
        ...req.body,
        user: req.user,
      });
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async searchMentor(req: req, res: res, next: next) {
    try {
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }

  async acceptRequest(req: req, res: res, next: next) {
    try {
      const data = await this.mentorUseCases.acceptRequest(req.body);
      res.status(data.status).json(data.data);
    } catch (error) {
      console.log(error);
      next(new ErrorHandler());
    }
  }
}
