import SideNav from "@/components/Sidenav";
import TopNav from "@/components/Topnav";
import RightNav from "@/components/Rightnav";
import PostBox from "@/components/Postbox";
import Post from "@/components/Post";

export default function DashboardPage() {
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
          <div className="w-full md:w-3/5 text-white h-auto md:h-full space-y-4">
            <PostBox />
            <Post/>
          </div>
          <div className="w-full md:w-1/5 h-auto md:h-full">
            <RightNav />
          </div>
        </div>
      </div>
    </>
  );
}
