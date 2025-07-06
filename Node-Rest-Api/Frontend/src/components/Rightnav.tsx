
export default function RightNav() {
  return (
    <div className="w-full p-4 space-y-4 text-sm text-gray-800  ">
      
      {/* 🎁 Birthday Section */}
      <div className="flex items-center gap-3">
        <img src="gift.png" alt="Gift" className="w-19 h-16" />
        <span className="text-lg">
          <strong className="font-bold">Pola Foster</strong> and{" "}
          <strong className="font-bold ">3 other friends</strong> have a birthday today.
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
        
        <div className="flex items-center gap-3 mb-3">
          {/* Profile + Green Dot */}
          <div className="relative">
            <img
              src="person.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Green Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          
          <span className="text-lg font-medium">Safak Kocaoglu</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          {/* Profile + Green Dot */}
          <div className="relative">
            <img
              src="person.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Green Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          
          <span className="text-lg font-medium">Safak Kocaoglu</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          {/* Profile + Green Dot */}
          <div className="relative">
            <img
              src="person.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Green Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          
          <span className="text-lg font-medium">Safak Kocaoglu</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          {/* Profile + Green Dot */}
          <div className="relative">
            <img
              src="person.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Green Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          
          <span className="text-lg font-medium">Safak Kocaoglu</span>
        </div>
        <div className="flex items-center gap-3 mb-3">
          {/* Profile + Green Dot */}
          <div className="relative">
            <img
              src="person.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* Green Dot */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          
          <span className="text-lg font-medium">Safak Kocaoglu</span>
        </div>
        
      </div>
    </div>
  );
}
