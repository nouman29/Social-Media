import { Image, MapPin, Smile, Tag } from "lucide-react";

export default function PostBox() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg border border-gray-200 shadow space-y-4 mt-4 md:mt-6 lg:mt-8 h-auto md:h-[35vh] lg:h-[30vh]">
      {/* Top: Profile + Input */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <img
          src="person.jpg" // Replace with your image path
          alt="profile"
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
        />
        <textarea
          placeholder="What's in your mind Safak?"
          className="flex-1 bg-gray-100 px-4 py-2 h-20 md:h-24 lg:h-30 outline-none text-sm md:text-base lg:text-sm text-black resize-none"
          rows={3}
          style={{ width: '100%' }}
        />
      </div>

      {/* Bottom: Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between border-t pt-4 md:pt-5 lg:pt-6">
        <div className="flex gap-2 md:gap-3 lg:gap-4 text-sm md:text-base lg:text-sm items-center">
          <span className="flex items-center gap-1 text-red-500 cursor-pointer">
            <Image size={18} /> Photo or Video
          </span>
          <span className="flex items-center gap-1 text-blue-600 cursor-pointer">
            <Tag size={18} /> Tag
          </span>
          <span className="flex items-center gap-1 text-green-600 cursor-pointer">
            <MapPin size={18} /> Location
          </span>
          <span className="flex items-center gap-1 text-yellow-500 cursor-pointer">
            <Smile size={18} /> Feelings
          </span>
        </div>

        <button className="bg-green-500 text-white px-4 py-1 rounded-md text-sm md:text-base lg:text-lg hover:bg-green-600 mt-2 md:mt-0">
          Share
        </button>
      </div>
    </div>
  );
}
