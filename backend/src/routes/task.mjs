import express from "express";
import { createTask } from "../controllers/Task.mjs";

const router = express.Router();

router.post("/createTask", createTask);

export default router;
