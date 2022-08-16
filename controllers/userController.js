import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });

  return token;
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    // send user info to browser
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// register
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    // create token
    const token = createToken(user._id);

    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, registerUser };
