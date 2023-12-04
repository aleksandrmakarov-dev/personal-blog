import { Router } from "express";
import tagController from "../controllers/tag.controller";
import roleProtectMiddleware from "../middleware/role-protect.middleware";
import userExtractMiddleware from "../middleware/user-extract.middleware";

const router = Router();

const onlyAdmin = roleProtectMiddleware(["admin"]);
const anyUser = roleProtectMiddleware(["admin", "user"]);
const extractUser = userExtractMiddleware();

router.get("/", extractUser, tagController.getList);
router.post("/", onlyAdmin, tagController.create);
router.get("/slug/:identifier", extractUser, tagController.getBySlug);
router.put("/follow/id/:identifier", anyUser, tagController.follow);
router.delete("/follow/id/:identifier", anyUser, tagController.unfollow);

export default router;
