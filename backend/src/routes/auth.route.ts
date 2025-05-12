import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/admin.controller";

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);



export default router;
