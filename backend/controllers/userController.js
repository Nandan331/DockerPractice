import mongoose from "mongoose";
import User from "../modals/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const Signup1 = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ email, password });

    const temporaryToken = jwt.sign(
      { userId: user._id, step: "signup" },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("temp_token", temporaryToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (err) {
    console.log("Sign up1 error: ", err);
    return res
      .status(500)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

export const SignUp2 = async (req, res) => {
  const { firstname, lastname, mobileNumber } = req.body;
  try {
    const tempToken = req.cookies.temp_token;
    if (!tempToken)
      return res.status(401).json({ message: "Unauthorized access" });

    const decodedUser = jwt.verify(tempToken, process.env.JWT_SECRET);
    if (decodedUser.step !== "signup") {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const user = await User.findById(decodedUser.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.mobileNumber = mobileNumber;
    await user.save();

    const permanentToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", permanentToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({error:err.message, message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const permanentToken = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", permanentToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({status: "success", message: "Login Successfull"});
  } catch (err) {
    res.status(500).json({error:err.message, message: "Something went wrong"});
  }
};

export const logoutUser = async(req, res) => {
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({message: "Logout successful"});
  }catch(err){
    return res.status(500).json({message: "Something went wrong"});
  }
}

export const getUser = async (req, res) => {
  try {
    const getToken = req.cookies.token;
    if (!getToken) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    const decodeUser = jwt.verify(getToken, process.env.JWT_SECRET);
    const user = await User.findById(decodeUser.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {password, ...userData} = user._doc;
    return res.status(200).json({ status: "success", data: userData });
  } catch (err) {
    return res.status(500).json({error: err.message, message: "Something went wrong" });
  }
};
