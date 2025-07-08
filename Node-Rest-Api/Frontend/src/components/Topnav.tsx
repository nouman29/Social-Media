import axios from "axios";
import { Bell, MessageSquare, Search, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
  
export default function TopNav() {

  const handleLogout = async () => {
    const response = await axios.post('http://localhost:3000/api/auth/logout',{},{
      withCredentials: true,
    });
    console.log(response.data);
    toast.success('Logged out successfully!');
    navigate('/login');
  }
  const navigate = useNavigate();
  return (
    <div className="min-h-[60px] w-full bg-blue-900 text-white flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2 md:py-0 fixed z-10 gap-3 md:gap-0">
      {/* Top section on mobile: App Name + Icons */}
      <div className="flex w-full md:w-auto items-center justify-between md:justify-start">
        {/* Left: App Name */}
        <Link to="/dashboard">
          <span className="text-lg md:text-xl font-bold">Social App</span>
        </Link>

        {/* Icons on mobile (right side) */}
        <div className="flex md:hidden items-center gap-3">
          <User className="cursor-pointer hover:text-gray-300 w-5 h-5" />
          <MessageSquare className="cursor-pointer hover:text-gray-300 w-5 h-5" />
          <Bell className="cursor-pointer hover:text-gray-300 w-5 h-5" />
          <div className="w-7 h-7 rounded-full bg-white" onClick={() => navigate('/profile')}>
            <img src="person.jpg" alt="" className="w-full h-full rounded-full" />
          </div>
        </div>
      </div>

      {/* Center: Search Bar + Tabs */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-5 w-full md:w-auto">
        {/* search bar icon */}
        <div className="flex items-center justify-center gap-2 border bg-white rounded-full w-full md:w-[45%] p-2">
          <Search className="cursor-pointer hover:text-gray-300 text-black w-4 h-4" />
          <input
            type="text"
            placeholder="Search for Friends, Posts..."
            className="px-2 md:px-4 py-1 rounded-md text-black focus:outline-none flex-1 text-sm"
          />
        </div>

        <div className="flex gap-4 md:gap-6 text-xs md:text-sm font-medium">
          <span className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/profile')}>Homepage</span>
          <span className="cursor-pointer hover:text-gray-300" onClick={() => navigate('/dashboard')}>Timeline</span>
        </div>
      </div>

      {/* Right: Icons + Profile (hidden on mobile, shown on md+) */}
      <div className="hidden md:flex items-center gap-4 lg:gap-6">
        <User className="cursor-pointer hover:text-gray-300" />
        <MessageSquare className="cursor-pointer hover:text-gray-300" />
        <Bell className="cursor-pointer hover:text-gray-300" />
        <div className="w-9 h-9 rounded-full bg-white" onClick={() => navigate('/profile')}>
          <img src="person.jpg" alt="" className="w-full h-full rounded-full" />
        </div>
        {/* add a logout button */}
        <button className="cursor-pointer p-2 bg-white text-black rounded-md hover:bg-gray-100 text-sm" onClick={() => handleLogout()}>Logout</button>
      </div>

      {/* Mobile logout button */}
      <div className="md:hidden w-full">
        <button className="cursor-pointer p-2 bg-white text-black rounded-md hover:bg-gray-100 text-sm w-full" onClick={() => handleLogout()}>Logout</button>
      </div>
    </div>
  );
}
