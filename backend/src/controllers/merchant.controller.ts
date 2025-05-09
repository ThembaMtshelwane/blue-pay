import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { INTERNAL_SERVER_ERROR } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";
import Merchant from "../model/users/merchant.model";
import { generatePassword } from "../utils/generatePassword";

export const registerMerchant = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const {
      email,
      companyName,
      companyID,
      companyEmail,
      businessBankingDetails,
    } = req.body;
    const existingMerchant = await Merchant.findOne({ companyID });
    if (existingMerchant) {
      throw new HTTP_Error("Merchant already esists", INTERNAL_SERVER_ERROR);
    }

    const newMerchant = await Merchant.create({
      email,
      companyName,
      companyID,
      companyEmail,
      businessBankingDetails,
      password: generatePassword(),
    });

    if (!newMerchant) {
      throw new HTTP_Error("Failed to create user", INTERNAL_SERVER_ERROR);
    }

    res.status(201).json({
      message: "Merchant created successfully",
      user: {
        id: newMerchant._id,
        email: newMerchant.companyEmail,
      },
    });
  }
);
