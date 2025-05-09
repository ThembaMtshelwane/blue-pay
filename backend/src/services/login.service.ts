import { UNAUTHORIZED } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";

export const loginService = async (Model: any, userCredentials: any) => {
  const { email, password } = userCredentials;
  const user = await Model.findOne({ email });
  if (user && (await user.matchPassword(password))) return user;
  else {
    throw new HTTP_Error("Invalid email or password", UNAUTHORIZED);
  }
};
