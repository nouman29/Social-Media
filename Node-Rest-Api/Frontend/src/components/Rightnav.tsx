import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from "@/store/userStore";

// Define a type for the user
interface User {
  _id: string;
  profilePicture: string | null;
  username: string;
  followers: string[];
}

export default function RightNav() {
  // Ensure the user object has the correct type
  const { user } = useUserStore();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get('http://localhost:3000/api/users/all', {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // Filter out the current user - ensure we're using the correct ID property
      const otherUsers = response.data.filter((u: User) => {
        // Check both _id and id properties to ensure proper filtering
        const currentUserId = user._id || user.id;
        return u._id !== currentUserId;
      });
      
      setUsers(otherUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const handleToggleFollow = async (targetUserId: string) => {
    if (!user) return;
    
    try {
      const isFollowing = users.find(u => u._id === targetUserId)?.followers.includes(user._id || user.id || '');

      await axios.put(
        `http://localhost:3000/api/users/${targetUserId}/follow`,
        {},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      // Update follow state locally
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u._id === targetUserId
            ? {
                ...u,
                followers: isFollowing
                  ? u.followers.filter(id => id !== (user._id || user.id))
                  : [...u.followers, (user._id || user.id || '')],
              }
            : u
        )
      );
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="w-full p-4 space-y-4 text-sm text-gray-800">
      {/* 🎁 Birthday Section */}
      <div className="flex items-center gap-3">
        <img src="gift.png" alt="Gift" className="w-19 h-16" />
        <span className="text-lg">
          <strong className="font-bold">Pola Foster</strong> and{" "}
          <strong className="font-bold">3 other friends</strong> have a birthday today.
        </span>
      </div>

      {/* 📸 Ad Section */}
      <div className="w-full">
        <img src="ad.png" alt="Ad" className="rounded-lg w-full" />
      </div>

      <hr />

      {/* 🟢 Online Friends */}
      <div>
        <h3 className="font-semibold text-lg mb-3">Online Friends</h3>
        {users.map((u) => {
          // Check if user is following
          const isFollowing = u.followers.includes(user?._id || user?.id || '');
          return (
            <div key={u._id} className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src={u.profilePicture || 'person.jpg'}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <span className="text-lg font-medium">{u.username}</span>
              </div>
              <button
                className={`px-3 py-1 rounded text-white ${isFollowing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
                onClick={() => handleToggleFollow(u._id)}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
