import { Router } from "express";
import postController from "../controllers/post.controller";
import roleProtectMiddleware from "../middleware/role-protect.middleware";

const router = Router();

const onlyAdmin = roleProtectMiddleware(["admin"]);

router.get("/", postController.getList);
router.post("/", onlyAdmin, postController.create);
router.get("/slug/:identifier", postController.getBySlug);
router.put("/id/:identifier", onlyAdmin, postController.updateById);
router.delete("/id/:identifier", onlyAdmin, postController.deleteById);

export default router;
