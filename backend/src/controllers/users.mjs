import User from "../model/user.mjs";

const getProfile = async (req, res) => {
  res.send(req.user);
};

const updateUser = async (req, res) => {
  // const id = req.params.id;
  const allowedUpdates = ["userName", "email", "password"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every((item) => allowedUpdates.includes(item));

  if (!isAllowed) {
    return res.status(403).send({ msg: "Not Allowed Parmeter is found" });
  }

  if (updates.includes("email")) {
    const isAlreadyTaken = await User.findEmailisTaken(req.body.email);
    console.log(isAlreadyTaken.email == req.body.email);
    if (isAlreadyTaken.taken) {
      return res.status(403).send({ msg: "Email is already in in use" });
    }
  }

  try {
    // const _user = await User.findByIdAndUpdate(id, req.body,{new: true,runValidators: true,useFindAndModify: true});
    // const _user = await User.findById(id);
    const _user = req.user;

    updates.forEach((update) => {
      _user[update] = req.body[update];
    });
    await _user.save();
    res.send(_user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    // const deletedUser = await User.findByIdAndDelete(req.user._id);
    // if (!deletedUser) return res.status(404).send({ msg: "user not Found" });
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getProfile, updateUser, deleteUser };
