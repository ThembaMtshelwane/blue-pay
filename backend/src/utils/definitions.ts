import mongoose, { Document } from "mongoose";

export interface IProduct {
  name: string;
  image: string;
  price: number; // rounded of to two decimal points i.e cents
  quantity: Number;
}

export type ITransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded";

export type IApplicationStatus = "pending" | "reject" | "approve";

export interface ITransaction {
  _id?: string;
  amount: number;
  currency: string; // e.g., 'ZAR', 'USD'
  date: Date; // ISO 8601 date string
  status: ITransactionStatus;
  customerId: string; // Customer ID reference
  merchantId: string; // Merchant ID reference
  description?: string;
  paymentMethod?: "card" | "eft" | "wallet" | string;
  reference?: string;
}

export interface IBillingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface IBankingDetails {
  bankName: string;
  accountNumber: string;
  accountType: "Savings" | "Current" | string;
  branchCode: string;
  cardNumber?: string;
  expiryDate?: string;
  billingAddress?: IBillingAddress;
}

export interface IBaseUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessTokenSecret: string;
  refreshTokenSecret: string;
}

export interface ICustomer extends IBaseUser {
  bankingDetails?: IBankingDetails;
  transactions?: string[]; // id of customer-merchant transactions ITransaction[];
}

export interface IMerchant extends IBaseUser {
  companyName: string;
  companyID: string;
  companyEmail: string;
  businessBankingDetails?: IBankingDetails;
  products?: string[]; // id of products IProduct[];
  transactions: string[]; // id of customer-merchant transactions ITransaction[];
  applicationStatus: IApplicationStatus;
}

export interface IAdmin extends IBaseUser {
  // transactions: string[]; // id of all of customer-merchant transactions ITransaction[];
}
