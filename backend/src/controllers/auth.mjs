import User from "../model/user.mjs";

const signUp = async (req, res) => {
  const { email, password, userName } = req.body;

  const regUser = await User.findOne({ email });

  if (regUser) return res.status(409).send({ msg: "Email is already in Use" });

  try {
    const _user = new User({
      email,
      password,
      userName,
    });
    await _user.save();

    res.send(_user);
    //todo:  Later Perform Redirect in frontend app using next SSR
  } catch (e) {
    const errors = [];
    for (const keys in e.errors) {
      errors.push(e.errors[keys].properties.message);
    }
    res.status(400).send(errors);
  }
};

export { signUp };
