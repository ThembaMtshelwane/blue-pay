import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Admin from "../model/users/admin.model";
import { registerService } from "../services/regsiterService";

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
