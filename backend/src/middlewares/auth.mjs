import jwt from "jsonwebtoken";
import User from "../model/user.mjs";

const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization").split(" ")[1];
    console.log(authHeader);
  } catch (error) {
    res.status(401).send({ error: "USer is not authenticated" });
  }
  next();
};

export { authMiddleWare };
