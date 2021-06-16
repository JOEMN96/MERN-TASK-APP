import User from "../model/user.mjs";

const getAllUsers = (req, res) => {
  User.findOne({})
    .then((users) => {
      if (!users) {
        res.status(404).send({ message: "No users Available" });
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// ? Get A Single User

const getSingleUsers = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "USer not Found" });
      }
      res.status(200).send(user);
    })
    .catch((e) => {
      res.status(500).send({ err: e });
    });
};

export { getAllUsers, getSingleUsers };
