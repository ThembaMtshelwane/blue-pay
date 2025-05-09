import express from "express";
import { registerUser } from "../controllers/auth.controller";
import { registerMerchant } from "../controllers/merchant.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post('/register', registerMerchant);

export default router;
