import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";
import Admin from "../model/users/admin.model";
import Merchant from "../model/users/merchant.model";
import Customer from "../model/users/customer.model";
import { generateSecret } from "../utils/generateSecret";

const modelNames = {
  admin: "Admin",
  customer: "Customer",
  merchant: "Merchant",
};

export const registerService = async (Model: any, registerBody: any) => {
  const { firstName, lastName, email } = registerBody;
  console.log(registerBody);

  const existingUser = await Model.findOne({ email });
  if (existingUser) {
    throw new HTTP_Error("User already exists", INTERNAL_SERVER_ERROR);
  }

  const generatedPassword = "123";

  const newUser = {
    firstName,
    lastName,
    email,
    password: generatedPassword,
    accessTokenSecret: generateSecret(),
    refreshTokenSecret: generateSecret(),
  };
  let user;
  if (Model.modelName === modelNames.admin) {
    user = await Admin.create({
      ...newUser,
    });
  }
  if (Model.modelName === modelNames.merchant) {
    user = await Merchant.create({
      ...newUser,
    });
  }
  if (Model.modelName === modelNames.customer) {
    user = await Customer.create({
      ...newUser,
    });
  }

  if (!user) {
    throw new HTTP_Error("Failed to create user", INTERNAL_SERVER_ERROR);
  }

  return user;
};
