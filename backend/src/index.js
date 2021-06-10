import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/user.js";

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/task",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log("Unable to connect to DB");
    app.listen(4000, () => {
      console.log("server is started");
    });
  }
);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(userRouter);
