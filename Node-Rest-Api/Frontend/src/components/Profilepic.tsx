import { Users } from "../data/dummyData";

export default function Profilepic() {
  const user = Users[0];
  return (
    <div className="relative text-center bg-gray-100 w-full mb-24">
      <div
        className="bg-cover bg-center h-70"
        style={{ backgroundImage: "url('land.jpg')" }}
      ></div>
      <div className="absolute top-47 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
        />
        <h2 className="mt-3 text-2xl font-semibold text-black">
          {user.username}
        </h2>
        <p className="text-gray-700">Hello my friends!</p>
      </div>
    </div>
  );
}
