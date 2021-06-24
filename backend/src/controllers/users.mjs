import User from "../model/user.mjs";

const getAllUsers = async (req, res) => {
  try {
    const _users = await User.find({});
    if (!_users) {
      return res.status(404).send({ message: "No users Available" });
    }
    res.status(200).send(_users);
  } catch (e) {
    res.status(500).send(e);
  }
};

// ? Get A Single User

const getSingleUsers = async (req, res) => {
  const id = req.params.id;

  try {
    const _user = await User.findById(id);
    if (!_user) {
      return res.status(404).json({ message: "USer not Found" });
    }
    res.status(200).send(_user);
  } catch (e) {
    res.status(500).send({ err: e });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;

  const allowedUpdates = ["userName", "email", "password"];
  const updates = Object.keys(req.body);
  const isAllowed = updates.every((item) => allowedUpdates.includes(item));

  if (!isAllowed) {
    return res.status(403).send({ msg: "Not Allowed Parmeter is found" });
  }

  try {
    // const _user = await User.findByIdAndUpdate(id, req.body,{new: true,runValidators: true,useFindAndModify: true});

    const _user = await User.findById(id);

    updates.forEach((update) => {
      _user[update] = req.body[update];
    });

    await _user.save();

    if (!_user) return res.status(404).send({ msg: "No user Found" });
    res.send(_user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send({ msg: "user not Found" });
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getAllUsers, getSingleUsers, updateUser, deleteUser };
