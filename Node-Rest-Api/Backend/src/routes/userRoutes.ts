import express from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";

const router = express.Router();

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      // Hash password if it's being updated
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // Optional: returns updated document
      );

      res.status(200).json("Account has been updated");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your account");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account");
  }
});

router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Destructure to exclude sensitive data
      const { password, updatedAt, createdAt, ...other } = user.toObject();
  
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", error: err });
    }
  });

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await user.updateOne({ $push: { following: req.body.userId } });
                res.status(200).json("User has been followed");
            }else{
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await user.updateOne({ $pull: { following: req.body.userId } });
                res.status(200).json("User has been unfollowed");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can follow only your account");
    }
});

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await user.updateOne({ $pull: { following: req.body.userId } });
                res.status(200).json("User has been unfollowed");
            }else{
                res.status(200).json("User has been followed");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can follow only your account");
    }
});

  

export default router;
