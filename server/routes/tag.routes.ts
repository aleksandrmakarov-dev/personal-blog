import { Router } from "express";
import tagController from "../controllers/tag.controller";
import roleProtectMiddleware from "../middleware/role-protect.middleware";

const router = Router();

const onlyAdmin = roleProtectMiddleware(["admin"]);

router.get("/", tagController.getList);
router.post("/", onlyAdmin, tagController.create);
router.get("/slug/:identifier", tagController.getBySlug);

export default router;
