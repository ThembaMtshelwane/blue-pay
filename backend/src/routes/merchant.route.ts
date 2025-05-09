import express from "express";
import { registerMerchant } from "../controllers/merchant.controller";
const router = express.Router();

router.post("/register", registerMerchant);

export default router;
