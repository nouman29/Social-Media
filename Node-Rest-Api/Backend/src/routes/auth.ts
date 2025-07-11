import express from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Register route - creates a new user account
router.post("/register", async (req, res) => {
  try {
    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with hashed password
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.profilePicture,
      city: req.body.city,
      country: req.body.country,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

// Login route - authenticates user and sets JWT cookie
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    res.cookie("token", `Bearer ${token}`, {
      // Prepend "Bearer " to the token
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
});

// Logout route - clears the JWT cookie
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
