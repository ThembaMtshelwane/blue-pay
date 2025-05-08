import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import User from "../schema/baseSchema";

export const registerUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    console.log("req.body  ", req.body);

    const { firstName, lastName, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const generatedPassword = "123";

    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: generatedPassword,
      });

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  }
);
