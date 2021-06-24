import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
        if (value.length < 8) {
          return false;
        }
      },
      message: (value) => "Password Must be 8 char Long",
    },
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hasedpw = await bcrypt.hash(user.password, 8);
    user.password = hasedpw;
  }
  next();
});

export default model("user", UserSchema);
