import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../schema/baseSchema";
import { INTERNAL_SERVER_ERROR } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new HTTP_Error("User already exists", INTERNAL_SERVER_ERROR);
    }
    const generatedPassword = "123";

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: generatedPassword,
    });

    if (!newUser) {
      throw new HTTP_Error("Failed to create user", INTERNAL_SERVER_ERROR);
    }

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  }
);
