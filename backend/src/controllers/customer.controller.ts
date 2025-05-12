import Customer from "../model/users/customer.model";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { registerService } from "../services/regsiter.service";

export const registerCustomer = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await registerService(Customer, req.body);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  }
);

export const logoutCustomer = (req: Request, res: Response) => {
  res.status(200).json({ message: "Logged out" });
};
