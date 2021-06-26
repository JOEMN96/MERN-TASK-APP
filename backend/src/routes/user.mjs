import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.mjs";
import {
  getAllUsers,
  getSingleUsers,
  updateUser,
  deleteUser,
} from "../controllers/users.mjs";
import { authMiddleWare } from "../middlewares/auth.mjs";

const router = Router();

router.post("/signup", signUp);
router.post("/signIn", signIn);
router.get("/users", authMiddleWare, getAllUsers);
router.get("/user/:id", authMiddleWare, getSingleUsers);
router.patch("/user/:id", authMiddleWare, updateUser);
router.delete("/user/:id", authMiddleWare, deleteUser);

export default router;
