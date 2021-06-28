import express from "express";
import {
  createTask,
  getAllTasks,
  getSingleTasks,
  updateTask,
  deleteTask,
} from "../controllers/Task.mjs";
import { authMiddleWare } from "../middlewares/auth.mjs";

const router = express.Router();

router.post("/createTask", authMiddleWare, createTask);
router.get("/getAllTasks", getAllTasks);
router.get("/task/:id", getSingleTasks);
router.patch("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);

export default router;
