import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Task from "./Task.mjs";

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
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

UserSchema.virtual("tasks", {
  ref: "task",
  localField: "_id",
  foreignField: "owner",
});

// ? On the Whole model
UserSchema.statics.findByCred = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    return false;
  }

  const isVerified = await bcrypt.compare(password, user.password);

  if (!isVerified) {
    throw new Error("Unable to Verify");
  }
  return user;
};

UserSchema.statics.findEmailisTaken = async (email) => {
  const user = await User.findOne({ email });
  if (user) {
    return { email: user.email, taken: true };
  } else {
    return { taken: false };
  }
};

// ? On the instance of the model ie:user
UserSchema.methods.generateJwt = async function () {
  const token = jwt.sign({ _id: this.id.toString() }, "SUPERSECERTKEY", {
    expiresIn: "7 days",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

// ? Before saving into the db

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hasedpw = await bcrypt.hash(user.password, 8);
    user.password = hasedpw;
  }
  next();
});

// ? Delete a users tasks when he is deleting the account

UserSchema.pre("remove", async function (next) {
  await Task.deleteMany({ owner: this._id });
  next();
});

const User = model("user", UserSchema);

export default User;
