import { Router } from "express";
import { signUp } from "../controllers/auth.mjs";
import {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.mjs";

const router = Router();

router.post("/signup", signUp);
router.get("/users", getAllUsers);
router.get("/user/:id", getSingleUsers);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
