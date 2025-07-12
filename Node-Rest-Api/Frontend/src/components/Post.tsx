// Import necessary components and types
import { MoreHorizontal, ThumbsUp } from "lucide-react";

import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { useUserStore } from "@/store/userStore";

// Define a type for the post
interface Post {
  id: number;
  desc: string;
  img: string | null;
  createdAt: string;
  comment: number;
  username: string;
  userId: {
    username: string;
    _id: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    profilePicture: string;
  };
  likes: number; // Added likes to the interface
}

export default function Post() {
  const { user } = useUserStore();
  const [posts, setPosts] = useState<Post[]>([]); // Use Post type for state
  const [likes, setLikes] = useState<number[]>([]);
  const [likedStatus, setLikedStatus] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = Cookies.get('token'); // Retrieve token from cookies
        const response = await axios.get('http://localhost:3000/api/posts/timeline/all', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Pass token in headers
          },
          withCredentials: true,
        });
        toast.success("Posts fetched successfully");
        console.log(response.data);
        const postsData: Post[] = response.data.allPosts;
        setPosts(postsData);
        setLikes(postsData.map(post => post.likes || 0)); // Initialize likes
        setLikedStatus(postsData.map(() => false)); // Initialize liked status
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);
  const handleLike = async (index: number) => {
    try {
      const token = Cookies.get('token');
      const postId = posts[index].id;
      
      const newLikes = [...likes];
      const newLikedStatus = [...likedStatus];
      newLikes[index] = likedStatus[index] ? likes[index] - 1 : likes[index] + 1;
      newLikedStatus[index] = !likedStatus[index];
      
      // Update UI immediately for better user experience
      setLikes(newLikes);
      setLikedStatus(newLikedStatus);
      
      // Send request to backend to update like status
      await axios.put(`http://localhost:3000/api/posts/${postId}/like`, {}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true,
      });
    } catch (error) {
      console.error('Error liking post:', error);
      // Revert the like state if the request fails
      const revertLikes = [...likes];
      const revertLikedStatus = [...likedStatus];
      setLikes(revertLikes);
      setLikedStatus(revertLikedStatus);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Render the posts
  return (
    <>
      {posts.length > 0 ? posts.map((post, index: number) => {
        return (
          <div
            key={`${post.id}-${index}`}
            className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {/* User profile picture */}
                {post.userId.profilePicture && (
                  <img
                    src={post.userId.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                )}
                <div>
                  {/* User name and post date */}
                  <h3 className="font-bold text-black">
                    {post.username}
                  </h3>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
                </div>
              </div>
              {/* More options icon */}
              <MoreHorizontal className="text-gray-500 cursor-pointer hover:text-gray-700" />
            </div>
            {/* Post description */}
            <p className="mb-3 text-black">{post.desc}</p>
            {/* Post image */}
            {post.img && (
              <img
                src={post.img}
                alt="Post"
                style={{ width: "100%", height: "65vh" }}
                className="w-full rounded-lg mb-3 object-cover"
              />
            )}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {/* Like button and count */}
                <ThumbsUp
                  className={`mr-1 cursor-pointer transition-colors ${
                    likedStatus[index] ? "text-blue-500" : "hover:text-blue-400"
                  }`}
                  onClick={() => handleLike(index)}
                />
                <span className="text-md">{likes[index]} people like this</span>
              </div>
              {/* Comment count */}
              <span className="text-md">{post.comment} comments</span>
            </div>
          </div>
        );
      }) : <p>No posts available</p>} {/* Handle case when no posts are available */}
    </>
  );
}