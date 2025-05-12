import { INTERNAL_SERVER_ERROR, NOT_FOUND } from "../consts/http.codes";
import HTTP_Error from "../utils/httpError";
import Admin from "../model/users/admin.model";
import Merchant from "../model/users/merchant.model";
import Customer from "../model/users/customer.model";
import { generateSecret } from "../utils/generateSecret";
import { generatePassword } from "../utils/generatePassword";
import { IAdmin, ICustomer, IMerchant } from "../utils/definitions";

const modelNames = {
  admin: "Admin",
  customer: "Customer",
  merchant: "Merchant",
};

export const registerService = async (Model: any, registerBody: any) => {
  const {
    firstName,
    lastName,
    email,
    companyName,
    companyID,
    companyEmail,
    businessBankingDetails,
  } = registerBody;

  const existingUser = await Model.findOne({ email });
  if (existingUser) {
    throw new HTTP_Error("User already exists", INTERNAL_SERVER_ERROR);
  }

  const newUser = {
    firstName,
    lastName,
    email,
    password: generatePassword(),
    accessTokenSecret: generateSecret(),
    refreshTokenSecret: generateSecret(),
  };

  let user: IMerchant | ICustomer | IAdmin | null = null;

  switch (Model.modelName) {
    case modelNames.admin:
      user = await Admin.create({
        ...newUser,
      });
      break;

    case modelNames.merchant:
      user = await Merchant.create({
        ...newUser,
        companyName,
        companyID,
        companyEmail,
        businessBankingDetails,
      });
      break;

    case modelNames.customer:
      user = await Customer.create({
        ...newUser,
      });
      break;

    default:
      break;
  }

  if (!user) {
    throw new HTTP_Error("Failed to create user", INTERNAL_SERVER_ERROR);
  }

  return user;
};
