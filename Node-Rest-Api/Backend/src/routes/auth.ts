import express from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // hashed the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create a new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
    // login route

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(404).json("User not found");
        }
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          return res.status(400).json("Invalid password");
        }
        res.status(200).send("Login successful");
        } catch (err) {
        res.status(500).json(err);
      }
});

export default router;
