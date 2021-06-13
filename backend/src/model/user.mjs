import mongoose from "mongoose";
import validator from "validator";

const model = mongoose.model;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (val) {
        if (!validator.isEmail(val)) return false;
      },
      message: (val) => `${val.value} must be a valid Email`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        if (!value.length > 8) return false;
      },
      message: (value) => "Password Must be 8 char Long",
    },
  },
});

export default model("user", UserSchema);
