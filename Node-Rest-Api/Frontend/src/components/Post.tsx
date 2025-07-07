import { MoreHorizontal, ThumbsUp } from 'lucide-react';
import { Users, Posts } from '../data/dummyData';
import type { User, Post } from '../data/dummyData';
import { useState } from 'react';

  export default function Post() {


  return (
  <>{Posts.map((post: Post) => {
    const [like, setLike] = useState(post.like);
    const [isLiked, setIsLiked] = useState(false);
    
    function handleLike() {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    };
    
  const user = Users.find((u: User) => u.id === post.userId);
  return (
    <div key={post.id} className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={user?.profilePicture || 'person.jpg'}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-black">{user?.username || 'Unknown User'}</h3>
            <p className="text-sm text-gray-500">{post.date}</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500" />
      </div>
      <p className="mb-3 text-black">{post.desc}</p>
      <img
        src={post.photo || 'post.png'}
        alt="Post"
        style={{ width: '100%', height: '65vh' }}
        className="w-full rounded-lg mb-3"
      />
      <div className="flex  items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ThumbsUp className={`mr-1 ${isLiked ? 'text-blue-500' : ''}`} onClick={handleLike} />
          <span className="text-md">{like} people like this</span>
        </div>
        <span className="text-md">{post.comment} comments</span>
      </div>
    </div>
  );
})}</>    
    
    
      
   
  );
} 