import express from "express";
import { registerUser } from "../controllers/auth.controller";
import { registerAdmin } from "../controllers/admin.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/register/admin", registerAdmin);

export default router;
