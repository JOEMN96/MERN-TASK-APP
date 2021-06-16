import { Router } from "express";
import { signUp } from "../controllers/auth.mjs";
import { getAllUsers, getSingleUsers } from "../controllers/users.mjs";

const router = Router();

router.post("/signup", signUp);
router.get("/users", getAllUsers);
router.get("/user/:id", getSingleUsers);

export default router;
