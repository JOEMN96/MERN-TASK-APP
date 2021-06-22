import User from "../model/user.mjs";

const signUp = async (req, res) => {
  const { email, password, usernName } = req.body;

  const regUser = await User.find({ email });

  if (regUser) return res.status(409).send({ msg: "Email is already in Use" });

  try {
    const _user = new User({
      email,
      password,
      usernName,
    });
    const user = await _user.save();
    console.log(isdone);
    res.status(201).send(user);
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
