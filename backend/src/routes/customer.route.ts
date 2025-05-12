import {
  logoutCustomer,
  registerCustomer,
} from "../controllers/customer.controller";

const express = require("express");
const router = express.Router();

router.post("/register", registerCustomer);
router.post("/logout", logoutCustomer);

export default router;
