import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in/password", userController.signInWithPassword);

export default router;
