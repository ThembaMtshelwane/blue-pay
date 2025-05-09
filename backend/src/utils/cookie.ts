import { Response } from "express";
import { generateAccessToken, generateRefreshToken } from "./jwt";
import { NODE_ENV } from "../consts/env.consts";

export const setAccessTokenCookie = (
  res: Response,
  userId: string,
  accessTokenSecret: string
) => {
  const accessToken = generateAccessToken(userId, accessTokenSecret);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "production",
    maxAge: 1000 * 60 * 15, // 15 minutes
    path: "/api",
  });
};

export const setRefreshAccessCookie = (
  res: Response,
  userId: string,
  accessTokenSecret: string
) => {
  const refreshAccess = generateRefreshToken(userId, accessTokenSecret);

  res.cookie("refreshAccess", refreshAccess, {
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 90, // 90 days
    path: "/api",
  });
};
