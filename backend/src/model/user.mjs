import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

UserSchema.statics.findByCred = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to Find Email");
  }

  const isVerified = await bcrypt.compare(password, user.password);

  if (!isVerified) {
    throw new Error("Unable to Verify");
  }
  return user;
};

UserSchema.methods.generateJwt = async function () {
  const token = jwt.sign({ _id: this.id.toString() }, "SUPERSECERTKEY", {
    expiresIn: "7 days",
  });
  this.tokens.push({ token });
  await this.save();
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hasedpw = await bcrypt.hash(user.password, 8);
    user.password = hasedpw;
  }
  next();
});

const User = model("user", UserSchema);

export default User;
