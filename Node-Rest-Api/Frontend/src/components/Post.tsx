// Import necessary components and types
import { MoreHorizontal, ThumbsUp } from "lucide-react";
// import { Users, Posts } from "../data/dummyData";
// import type { User, Post } from "../data/dummyData";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Post() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [postedBy, setPostedBy] = useState<string | null>(null);

  const [likes, setLikes] = useState<number[]>([]);
  const [likedStatus, setLikedStatus] = useState<boolean[]>([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:3000/api/posts/timeline/all/6868d756889f1db122609475"); 
      const data = await response.data;
      setCurrentUser(data.userId);
      setPosts(data);
      setLikes(data.map(() => 0)); // Initialize likes array
      setLikedStatus(data.map(() => false)); // Initialize liked status array
    };  
    fetchPosts();
    const fetchUser = async () => {
      const response = await axios.get("http://localhost:3000/api/users/6868d756889f1db122609475");
      const data = await response.data;
      setPostedBy(data);
    };
    fetchUser();
  }, []);

  const handleLike = (index: number) => {
    const newLikes = [...likes];
    const newLikedStatus = [...likedStatus];
    newLikes[index] = likedStatus[index] ? likes[index] - 1 : likes[index] + 1;
    newLikedStatus[index] = !likedStatus[index];
    setLikes(newLikes);
    setLikedStatus(newLikedStatus);
  };

  console.log(posts);
  console.log(currentUser);
  
  // Render the posts
  return (
    <>
      {posts?.map((post: any, index: number) => {
        // Find the user who created the post

        return (
          <div
            key={post.userId}
            className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto "
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {/* User profile picture */}
                <img
                  src={postedBy ? postedBy.profilePicture : "person.jpg"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  {/* User name and post date */}
                  <h3 className="font-bold text-black">
                    {postedBy ? postedBy.username : "You"}
                  </h3>
                  <p className="text-sm text-gray-500">{post.createdAt}</p>
                </div>
              </div>
              {/* More options icon */}
              <MoreHorizontal className="text-gray-500" />
            </div>
            {/* Post description */}
            <p className="mb-3 text-black">{post.desc}</p>
            {/* Post image */}
            <img
              src={post.photo || "post.png"}
              alt="Post"
              style={{ width: "100%", height: "65vh" }}
              className="w-full rounded-lg mb-3"
            />
            <div className="flex  items-center justify-between text-sm text-gray-500">
              <div className="flex items-center gap-2">
                {/* Like button and count */}
                <ThumbsUp
                  className={`mr-1 ${likedStatus[index] ? "text-blue-500" : ""}`}
                  onClick={() => handleLike(index)}
                />
                <span className="text-md">{likes[index]} people like this</span>
              </div>
              {/* Comment count */}
              <span className="text-md">{post.comment} comments</span>
            </div>
          </div>
        );
      })}
    </>
  );
  }