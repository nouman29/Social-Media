// Import necessary components and types
import { MoreHorizontal, ThumbsUp } from "lucide-react";

import { useState } from "react";
import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

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
}

export default function Post() {
  const [posts, setPosts] = useState<Post[]>([]); // Use Post type for state
  const [likes, setLikes] = useState<number[]>([]);
  const [likedStatus, setLikedStatus] = useState<boolean[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts/timeline/all', {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }); 
        console.log(response.data)
        setPosts(response.data.allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (index: number) => {
    const newLikes = [...likes];
    const newLikedStatus = [...likedStatus];
    newLikes[index] = likedStatus[index] ? likes[index] - 1 : likes[index] + 1;
    newLikedStatus[index] = !likedStatus[index];
    setLikes(newLikes);
    setLikedStatus(newLikedStatus);
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
            key={post.id}
            className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {/* User profile picture */}
                <img
                  src={post.userId.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
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