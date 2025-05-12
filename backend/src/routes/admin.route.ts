import express from "express";
import {
  loginAdmin,
  registerAdmin,
  updateApplication,
} from "../controllers/admin.controller";

const router = express.Router();

router.post("/register/admin", registerAdmin);
router.post("/login/admin", loginAdmin);
router.patch("/merchants/:id", updateApplication);

export default router;
