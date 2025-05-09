import jwt from "jsonwebtoken";

export const generateAccessToken = (
  userId: string,
  accessTokenSecret: string
) => {
  return jwt.sign({ userId }, accessTokenSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (
  userId: string,
  refreshAccessToken: string
) => {
  return jwt.sign({ userId }, refreshAccessToken, { expiresIn: "90d" });
};

export const verifyAccessToken = (token: string, accessTokenSecret: string) => {
  return jwt.verify(token, accessTokenSecret);
};

export const verifyRefreshToken = (
  token: string,
  refreshAccessToken: string
) => {
  return jwt.verify(token, refreshAccessToken);
};
