import express from "express";
//  Files imports
import "./db.mjs";
import userRouter from "./routes/user.mjs";
import taskRouter from "./routes/task.mjs";

const app = express();

app.use(userRouter);
app.use(taskRouter);
