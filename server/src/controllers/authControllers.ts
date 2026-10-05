import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import generateToken from "../utils/generateToken";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    //check the inputs
    if (!username || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "All Fields required" });
      return;
    }
    if (password != confirmPassword) {
      res.status(400).json({ message: "Password does not match" });
      return;
    }

    // checks if the user already exists(be it username or email)
    const userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      res.status(400).json({ message: "user already exists" });
      return;
    }

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creater user or new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //respond
    res.status(201).json({
      message: "Registered Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    //validate the inputs
    if (!identifier || !password) {
      res.status(400).json({ message: "Please fill in your Username/Email" });
      return;
    }

    // find a user
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      res.status(401).json({ message: "Invalid Credential" });
      return;
    }

    //3 compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid username/email or password" });
      return;
    }

    //respond
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Server Error";
    res.status(500).json({ message });
  }
};
