import express from "express";
import Post from "../models/postSchema";
import User from "../models/userSchema";
import checkAuth from "../middleware/check";

const router = express.Router();

// Create a post - requires authentication
router.post("/", checkAuth, async (req, res) => {
    const currentUser = await User.findById(req.user.id);
        
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
    const newPost = new Post({
        userId: currentUser._id, // Ensure this is an ObjectId
        username: currentUser.username,
        desc: req.body.post,
        img: req.body.img,
    });
    
    try {
        const savedPost = await newPost.save();
        res.status(200).json({ message: "Post created successfully", post: savedPost });
    } catch (err) {
        res.status(500).json({ message: "Failed to create post", error: err });
    }
});

// Update a post - requires authentication
router.put("/:id", checkAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // Check if the authenticated user owns this post
        if (post.userId === req.user.id) {
            await post.updateOne({ $set: req.body });
            res.status(200).json({ message: "Post has been updated" });
        } else {
            res.status(403).json({ message: "You can update only your own posts" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to update post", error: err });
    }
});

// Delete a post - requires authentication
router.delete("/:id", checkAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        // Check if the authenticated user owns this post
        if (post.userId === req.user.id) {
            await post.deleteOne();
            res.status(200).json({ message: "Post has been deleted" });
        } else {
            res.status(403).json({ message: "You can delete only your own posts" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to delete post", error: err });
    }
});

// Like/unlike a post - requires authentication
router.put("/:id/like", checkAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        const userId = req.user.id;
        
        if (!post.likes.includes(userId)) {
            // Like the post
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json({ message: "Post has been liked" });
        } else {
            // Unlike the post
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json({ message: "Post has been unliked" });
        }
    } catch (err) {
        res.status(500).json({ message: "Failed to like/unlike post", error: err });
    }
});

// Get a single post - public route (no authentication required)
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch post", error: err });
    }
});

// Get timeline posts for a user - requires authentication
router.get("/timeline/all", checkAuth, async (req, res) => {
    try {
        console.log("req.user.id",req.user.id)
        const currentUser = await User.findById(req.user.id);
        
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = await Post.find().populate("userId");
        // Get user's own posts
        const userPosts = await Post.find({ userId: currentUser._id }).populate("userId");
        
        // Get posts from users they follow
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId }).populate("userId");
            })
        );
        
        // Combine and return all posts
        const allPosts = userPosts.concat(...friendPosts);
        res.status(200).json({allPosts, posts});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch timeline", error: err });
    }
});

export default router;
