import {
  Home,
  User,
  Settings,
  LogOut,
  Bookmark,
  HelpCircle,
  Briefcase,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { to: '/', icon: <Home size={20} />, label: 'Feed' },
  { to: '/profile', icon: <User size={20} />, label: 'Chats' },
  { to: '/settings', icon: <Settings size={20} />, label: 'Videos' },
  { to: '/bookmarks', icon: <Bookmark size={20} />, label: 'Bookmarks' },
  { to: '/questions', icon: <HelpCircle size={20} />, label: 'Questions' },
  { to: '/jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
  { to: '/events', icon: <Calendar size={20} />, label: 'Events' },
  { to: '/courses', icon: <BookOpen size={20} />, label: 'Courses' },
];

export default function SideNav() {
  return (
    <aside className=" w-[15%]  overflow-y-hidden text-white p-6 hidden md:block  fixed  h-[calc(100vh-60px)]">
      <h2 className="text-2xl font-bold mb-8 text-black">Dashboard</h2>
      <nav className=" space-y-5  text-black">
        {navItems.map((item, index) => (
          <Link key={index} to={item.to} className="flex items-center gap-3  hover:text-black">
            {item.icon} {item.label}
          </Link>
        ))}
        <button className="flex items-center gap-3  hover:text-black">
          <LogOut size={20} /> Show More
        </button>
        <hr />
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
          <div className="bg-white text-black"> Safaak Koca</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
          <div className="bg-white text-black"> Safaak Koca</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
          <div className="bg-white text-black"> Safaak Koca</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
          <div className="bg-white text-black"> Safaak Koca</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 rounded-full w-8 h-8"></div>
          <div className="bg-white text-black"> Safaak Koca</div>
        </div>
      </nav>
    </aside>
  );
}
