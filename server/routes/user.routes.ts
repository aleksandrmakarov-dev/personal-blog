import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in/password", userController.signInWithPassword);
router.post("/refresh-token", userController.refreshToken);
router.post("/sign-out", userController.signOut);

export default router;
