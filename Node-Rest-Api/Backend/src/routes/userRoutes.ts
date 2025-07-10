import express from "express";
import User from "../models/userSchema";
import bcrypt from "bcrypt";
import checkAuth from "../middleware/check";

// Extend Express Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const router = express.Router();

// Update user profile - requires authentication
router.put("/:id", checkAuth, async (req, res) => {
  // Use authenticated user's ID from token instead of request body
  const authenticatedUserId = req.user.id;
  
  if (authenticatedUserId === req.params.id || req.body.isAdmin) {
    try {
      // Hash password if it's being updated
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "Account has been updated" });
    } catch (err) {
      res.status(500).json({ message: "Update failed", error: err });
    }
  } else {
    res.status(403).json({ message: "You can update only your account" });
  }
});

// Delete user account - requires authentication
router.delete("/:id", checkAuth, async (req, res) => {
  const authenticatedUserId = req.user.id;
  
  if (authenticatedUserId === req.params.id || req.body.isAdmin) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({ message: "Account has been deleted" });
    } catch (err) {
      res.status(500).json({ message: "Deletion failed", error: err });
    }
  } else {
    res.status(403).json({ message: "You can delete only your account" });
  }
});

// Get all users - public route (no authentication required)
router.get("/all", checkAuth, async (req, res) => {
  try {
    console.log("all users");

    const users = await User.find({}, '-password -updatedAt -createdAt'); // Exclude sensitive data
    res.status(200).json(users);
    console.log(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// Get user profile - public route (no authentication required)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Exclude sensitive data from response
    const { password, updatedAt, createdAt, ...other } = user.toObject();

    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
});

// Follow/unfollow user - requires authentication
router.put("/:id/follow", checkAuth, async (req, res) => {
  const authenticatedUserId = req.user.id;
  
  if (authenticatedUserId !== req.params.id) {
    try {
      const currentUser = await User.findById(authenticatedUserId);
      const targetUser = await User.findById(req.params.id);
      
      if (!currentUser) {
        return res.status(404).json({ message: "Current user not found" });
      }
      
      if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
      }
      
      if (!targetUser.followers.includes(authenticatedUserId)) {
        // Follow user
        await targetUser.updateOne({ $push: { followers: authenticatedUserId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json({ message: "User has been followed" });
      } else {
        // Unfollow user
        await targetUser.updateOne({ $pull: { followers: authenticatedUserId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowed" });
      }
    } catch (err) {
      res.status(500).json({ message: "Follow operation failed", error: err });
    }
  } else {
    res.status(403).json({ message: "You cannot follow yourself" });
  }
});

// Legacy unfollow route - can be removed since follow/unfollow is handled in one endpoint
router.put("/:id/unfollow", checkAuth, async (req, res) => {
  const authenticatedUserId = req.user.id;
  
  if (authenticatedUserId !== req.params.id) {
    try {
      const currentUser = await User.findById(authenticatedUserId);
      const targetUser = await User.findById(req.params.id);
      
      if (!currentUser) {
        return res.status(404).json({ message: "Current user not found" });
      }
      
      if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
      }
      
      if (targetUser.followers.includes(authenticatedUserId)) {
        await targetUser.updateOne({ $pull: { followers: authenticatedUserId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json({ message: "User has been unfollowed" });
      } else {
        res.status(200).json({ message: "User was not being followed" });
      }
    } catch (err) {
      res.status(500).json({ message: "Unfollow operation failed", error: err });
    }
  } else {
    res.status(403).json({ message: "You cannot unfollow yourself" });
  }
});

export default router;
