import express from "express";
import mongoose from "mongoose";
import cors from "cors";
//  Files imports
import userRouter from "./routes/user.mjs";
import taskRouter from "./routes/task.mjs";

const app = express();

mongoose.connect(
  "mongodb://localhost:27017/task",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      throw new Error("db issue");
    }
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
app.use(taskRouter);
app.use((req, res) => {
  res.status(404).send("Not Found");
});
