import jwt from "jsonwebtoken";
import User from "../model/user.mjs";

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "SUPERSECERTKEY");
    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "User is not authenticated" });
  }
};

export { authMiddleWare };
