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
  version: {
    type: Number,
    default: 0,
  },
});

export default model("task", Task);
