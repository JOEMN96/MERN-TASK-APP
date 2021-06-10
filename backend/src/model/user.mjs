import { Schema, model } from "mongoose";
import { isEmail } from "validator";

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
        if (!isEmail(val)) return false;
      },
      message: (val) => `${val} must be a valid Email`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        if (value.length < 8) {
          return false;
        }
      },
      message: (value) => "Password Must be 8 char Long",
    },
  },
});

export default model("user", UserSchema);
