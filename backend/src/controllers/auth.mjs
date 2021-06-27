import User from "../model/user.mjs";

const signUp = async (req, res) => {
  const { email, password, userName } = req.body;

  const regUser = await User.findOne({ email });

  if (regUser) return res.status(409).send({ msg: "Email is Taken" });

  try {
    const _user = new User({
      email,
      password,
      userName,
    });
    await _user.save();
    const token = await _user.generateJwt();

    res.status(201).send({ user: _user, token });
    //todo:  Later Perform Redirect in frontend app using next SSR
  } catch (e) {
    const errors = [];
    for (const keys in e.errors) {
      errors.push(e.errors[keys].properties.message);
    }
    res.status(400).send(errors);
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findByCred(req.body.email, req.body.password);
    const token = await user.generateJwt();

    if (!user) {
      res.status(404).send(404);
    }
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Something went Wrong", err: error });
  }
};

const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500);
  }
};

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500);
  }
};

export { signUp, signIn, logOut, logOutAll };
