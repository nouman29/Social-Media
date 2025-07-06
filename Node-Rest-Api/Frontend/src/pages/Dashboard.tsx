import SideNav from "@/components/Sidenav";
import TopNav from "@/components/Topnav";
import RightNav from "@/components/Rightnav";
import PostBox from "@/components/Postbox";
import Post from "@/components/Post";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-col w-full ">
        {/* top nav */}
        <TopNav />
        <div className="flex flex-row w-full mt-[60px]  h-[calc(100vh-60px)]">
          {/* side nav */}
          <div className=" w-[15%] h-full  ">
            <SideNav />
          </div>

          {/* main content */}
          <div className="w-[55%]  text-white h-full space-y-4">
            <PostBox />
            <Post />
          </div>
          <div className="w-[30%] h-full  ">
            <RightNav />
          </div>
        </div>
      </div>
    </>
  );
}
