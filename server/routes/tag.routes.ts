import { Router } from "express";
import tagController from "../controllers/tag.controller";

const router = Router();

router.get("/", tagController.getList);
router.post("/", tagController.create);

export default router;
