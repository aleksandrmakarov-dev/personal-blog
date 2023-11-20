import { Router } from "express";
import postController from "../controllers/post.controller";
import roleProtectMiddleware from "../middleware/role-protect.middleware";
import userExtractMiddleware from "../middleware/user-extract.middleware";

const router = Router();

const onlyAdmin = roleProtectMiddleware(["admin"]);
const anyUser = roleProtectMiddleware(["admin", "user"]);
const extractUser = userExtractMiddleware();

router.get("/", extractUser, postController.getList);
router.post("/", onlyAdmin, postController.create);
router.get("/slug/:identifier", postController.getBySlug);
router.put("/id/:identifier", onlyAdmin, postController.updateById);
router.delete("/id/:identifier", onlyAdmin, postController.deleteById);
router.put("/id/:identifier/favorite", anyUser, postController.favorite);
router.delete("/id/:identifier/unfavorite", anyUser, postController.unfavorite);

export default router;
