import mongoose, { Schema } from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const Task = new Schema({
  completed: {
    type: Boolean,
    default: false,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  version: {
    type: Number,
    default: 0,
  },
});

export default model("task", Task);
