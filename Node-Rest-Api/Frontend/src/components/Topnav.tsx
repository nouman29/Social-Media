import { Bell, MessageSquare, Search, User } from "lucide-react";

export default function TopNav() {
  return (
    <div className="h-[60px] w-full bg-blue-900 text-white flex items-center justify-between px-6 fixed z-10">
      {/* Left: App Name */}
      <div className="text-xl font-bold">Social App</div>

      {/* Center: Search Bar + Tabs */}
      <div className="flex-1 flex items-center justify-center space-x-5  ">
        {/* search bar icon */}
        <div className="flex items-center justify-center  gap-2 border bg-white rounded-full w-[45%] p-2  ">
        <Search className="cursor-pointer hover:text-gray-300  text-black" />
        
        <input
          type="text"
          placeholder="Search for Friends, Posts..."
          className=" px-4 py-1 rounded-md text-black focus:outline-none "

        />
        </div>

        <div className="flex gap-6 text-sm font-medium">
          <span className="cursor-pointer hover:text-gray-300">Homepage</span>
          <span className="cursor-pointer hover:text-gray-300">Timeline</span>
        </div>
      </div>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-6 space-x-5">
        <User className="cursor-pointer hover:text-gray-300" />
        <MessageSquare className="cursor-pointer hover:text-gray-300" />
        <Bell className="cursor-pointer hover:text-gray-300" />
        <div className="w-9 h-9 rounded-full bg-white">
            <img src="person.jpg" alt="" className="w-full h-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
