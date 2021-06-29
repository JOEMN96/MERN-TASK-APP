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
router.get("/getAllTasks", authMiddleWare, getAllTasks);
router.get("/task/:id", authMiddleWare, getSingleTasks);
router.patch("/task/:id", authMiddleWare, updateTask);
router.delete("/task/:id", authMiddleWare, deleteTask);

export default router;
