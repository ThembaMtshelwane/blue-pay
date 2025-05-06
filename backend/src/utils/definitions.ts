export interface IProduct {
  name: string;
  price: number; // rounded of to two decimal points i.e cents
}

export type TransactionStatus = "pending" | "completed" | "failed" | "refunded";

export interface ITransaction {
  _id?: string;
  amount: number;
  currency: string; // e.g., 'ZAR', 'USD'
  date: string; // ISO 8601 date string
  status: TransactionStatus;
  customerId: string; // Customer ID reference
  merchantId: string; // Merchant ID reference
  description?: string;
  paymentMethod?: "card" | "eft" | "wallet" | string;
  reference?: string;
}

interface IBillingAddress {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

interface IBankingDetails {
  bankName: string;
  accountNumber: string;
  accountType: "Savings" | "Current" | string;
  branchCode: string;
  cardNumber?: string;
  expiryDate?: string;
  billingAddress?: IBillingAddress;
}

interface IBaseUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface ICustomer extends IBaseUser {
  bankingDetails?: IBankingDetails;
  transactions?: string[]; // id of customer-merchant transactions ITransaction[];
}

export interface IMerchant extends IBaseUser {
  companyName: string;
  companyID: string;
  businessBankingDetails?: IBankingDetails;
  products?: string[]; // id of products IProduct[];
  trnasactions: string[]; // id of customer-merchant transactions ITransaction[];
}

export interface IAdmin extends IBaseUser {
  trnasactions: string[]; // id of all of customer-merchant transactions ITransaction[];
}
