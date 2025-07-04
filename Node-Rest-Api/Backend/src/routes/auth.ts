import express from "express";
import User from "../models/userSchema";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
    const user=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    });
        user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.post("/login", (req, res) => {
//     res.send("Hello World");
// });

export default router;