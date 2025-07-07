import SideNav from "@/components/Sidenav";
import TopNav from "@/components/Topnav";
import PostBox from "@/components/Postbox";
import Post from "@/components/Post";
import Profilepic from "@/components/Profilepic";

export default function ProfilePage() {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* top nav */}
        <TopNav />
        <div className="flex flex-col md:flex-row w-full mt-16 md:mt-[60px] h-auto md:h-[calc(100vh-60px)]">
          {/* side nav */}
          <div className="w-full md:w-1/5 h-auto md:h-full">
            <SideNav />
          </div>

          {/* main content */}
          <div className="w-full md:w-4/5 text-white h-auto md:h-full space-y-4">
            <Profilepic />
            <PostBox />
            <Post />
          </div>
        </div>
      </div>
    </>
  );
}
