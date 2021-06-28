import mongoose from "mongoose";

let schema = mongoose.Schema;
const model = mongoose.model;

const Task = new schema({
  completed: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "user",
  },
});

export default model("task", Task);
