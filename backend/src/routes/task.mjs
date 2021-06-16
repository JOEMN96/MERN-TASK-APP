import express from "express";
import {
  createTask,
  getAllTasks,
  getSingleTasks,
} from "../controllers/Task.mjs";

const router = express.Router();

router.post("/createTask", createTask);
router.get("/getAllTasks", getAllTasks);
router.get("/task/:id", getSingleTasks);

export default router;
