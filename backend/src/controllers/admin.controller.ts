import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Admin from "../model/users/admin.model";
import { registerService } from "../services/regsiter.service";
import { loginService } from "../services/login.service";
import { IAdmin, IApplicationStatus, IMerchant } from "../utils/definitions";
import { setAccessTokenCookie, setRefreshAccessCookie } from "../utils/cookie";
import Merchant from "../model/users/merchant.model";
import HTTP_Error from "../utils/httpError";
import { NOT_FOUND, OK } from "../consts/http.codes";

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

export const updateApplication = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const applicationStatus: IApplicationStatus = req.body.applicationStatus;
    console.log("id  ", id);

    const merchant: IMerchant | null = await Merchant.findById(id);
    if (!merchant)
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);

    const updateMerchant = await Merchant.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateMerchant)
      throw new HTTP_Error("No document found with that ID", NOT_FOUND);

    let message = "Merchant application is pending";

    if (applicationStatus === "approve") {
      message = "Merchant application has been approved";
    }
    if (applicationStatus === "reject") {
      message = "Merchant application has been rejected";
    }

    res.status(OK).json({
      success: true,
      message,
      data: updateMerchant,
    });
  }
);
