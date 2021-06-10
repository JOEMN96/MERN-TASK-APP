import { Router } from "express";
import { user } from "../controllers/user.mjs";

const router = Router();

router.get("/", user);

export default router;
