import User from "../models/user_model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";

//888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const signup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords don't match" });
  }

  const user = await User.findOne({ email });
  if (user) {
    return res.status(202).json({ error: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  var newUser = new User({
    id: uuidv4(),
    email,
    password: hashedPassword,
  });
  try {
    if (newUser) {
      //Generate JWT token here

      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save(); //This will save data to DB.
      console.log(newUser);
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
  res.status(201).json({
    user: newUser.toObject({ getters: true }),
  });
};

//8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); //This we find in DB
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
