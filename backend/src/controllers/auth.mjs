import User from "../model/user.mjs";

const signUp = async (req, res) => {
  const { email, password, usernName } = req.body;

  try {
    const _user = new User({ email, password, usernName });

    const isdone = await _user.save();
    console.log(isdone);
    res.status(201).send({ verified: true, state: "sucess" });
    //  Later Perform Redirect in frontend app using next SSR
  } catch (e) {
    console.log(e);
    const errors = [];
    for (const keys in e.errors) {
      errors.push(e.errors[keys].properties.message);
    }
    res.status(400).send(errors);
  }
};

export { signUp };
