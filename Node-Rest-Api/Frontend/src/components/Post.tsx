import { MoreHorizontal, ThumbsUp } from 'lucide-react';

export default function Post() {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src="person.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-black">Safak Kocaoglu</h3>
            <p className="text-sm text-gray-500">5 mins ago</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500" />
      </div>
      <p className="mb-3 text-black">Love For All, Hatred For None.</p>
      <img
        src="post.png"
        alt="Post"
        style={{ width: '100%', height: '65vh' }}
        className="w-full rounded-lg mb-3"
      />
      <div className="flex  items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ThumbsUp className="mr-1" />
          <span className="text-md">123 people likes this</span>
        </div>
        <span className="text-md">8 comments</span>
      </div>
    </div>
    <div className="bg-white shadow rounded-lg p-4 mb-4 max-w-3xl mx-auto ">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src="person.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-bold text-black">Safak Kocaoglu</h3>
            <p className="text-sm text-gray-500">5 mins ago</p>
          </div>
        </div>
        <MoreHorizontal className="text-gray-500" />
      </div>
      <p className="mb-3 text-black">Love For All, Hatred For None.</p>
      <img
        src="post.png"
        alt="Post"
        style={{ width: '100%', height: '65vh' }}
        className="w-full rounded-lg mb-3"
      />
      <div className="flex  items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <ThumbsUp className="mr-1" />
          <span className="text-md">123 people likes this</span>
        </div>
        <span className="text-md">8 comments</span>
      </div>
    </div>
    </>
  );
} 