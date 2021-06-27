import { Router } from "express";
import { signUp, signIn, logOut, logOutAll } from "../controllers/auth.mjs";
import { getProfile, updateUser, deleteUser } from "../controllers/users.mjs";
import { authMiddleWare } from "../middlewares/auth.mjs";

const router = Router();

router.post("/signup", signUp);
router.post("/signIn", signIn);
router.post("/logOut", authMiddleWare, logOut);
router.post("/logOutAll", authMiddleWare, logOutAll);
router.get("/users/me", authMiddleWare, getProfile);
router.patch("/user/me", authMiddleWare, updateUser);
router.delete("/user/:id", authMiddleWare, deleteUser);

export default router;
