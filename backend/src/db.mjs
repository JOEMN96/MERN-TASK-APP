import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();

mongoose.connect("mongodb://localhost:27017/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
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