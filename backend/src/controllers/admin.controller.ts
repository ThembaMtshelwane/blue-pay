import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Admin from "../model/users/admin.model";
import { registerService } from "../services/regsiter.service";
import { loginService } from "../services/login.service";
import { IAdmin } from "../utils/definitions";
import { setAccessTokenCookie, setRefreshAccessCookie } from "../utils/cookie";

export const registerAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerService(Admin, req.body);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }
);

export const loginAdmin = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user: IAdmin = await loginService(Admin, req.body);
    if (user) {

      setAccessTokenCookie(res, user._id as string, user.accessTokenSecret);
      setRefreshAccessCookie(res, user._id as string, user.refreshTokenSecret);
      
      res.status(200).json({
        success: true,
        message: "User authenticated successfully",
        data: user,
      });
    }
  }
);
