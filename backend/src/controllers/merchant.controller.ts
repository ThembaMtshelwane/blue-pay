import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Merchant from "../model/users/merchant.model";
import { registerService } from "../services/regsiter.service";
import { IMerchant } from "../utils/definitions";
import { loginService } from "../services/login.service";
import { setAccessTokenCookie, setRefreshAccessCookie } from "../utils/cookie";

export const registerMerchant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const newMerchant = (await registerService(
      Merchant,
      req.body
    )) as IMerchant;

    res.status(201).json({
      message: "Merchant created successfully",
      user: {
        id: newMerchant._id,
        email: newMerchant.companyEmail,
      },
    });
  }
);

export const loginMerchant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user: IMerchant = await loginService(Merchant, req.body);
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
