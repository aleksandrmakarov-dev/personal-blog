import { Router } from "express";
import postController from "../controllers/post.controller";

const router = Router();

router.get("/", postController.getAll);
router.post("/", postController.create);
router.get("/slug/:identifier", postController.getBySlug);
router.put("/id/:identifier", postController.updateById);
router.delete("/id/:identifier", postController.deleteById);

export default router;
