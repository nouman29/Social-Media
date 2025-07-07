// Type definitions
export interface User {
    id: number;
    profilePicture: string;
    username: string;
  }
  
  export interface Post {
    id: number;
    desc?: string;
    photo: string;
    date: string;
    userId: number;
    like: number;
    comment: number;
  }
  
  // User data
  export const Users: User[] = [
    {
      id: 1,
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "Safak Kocaoglu",
    },
    {
      id: 2,
      profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
      username: "Janell Shrum",
    },
    {
      id: 3,
      profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
      username: "Alex Durden",
    },
    {
      id: 4,
      profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
      username: "Dora Hawks",
    },
    {
      id: 5,
      profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
      username: "Thomas Holden",
    },
    {
      id: 6,
      profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
      username: "Shirley Beauchamp",
    },
    {
      id: 7,
      profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
      username: "Travis Bennett",
    },
    {
      id: 8,
      profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
      username: "Kristen Thomas",
    },
    {
      id: 9,
      profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
      username: "Gary Duty",
    },
    {
      id: 10,
      profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
      username: "Safak Kocaoglu",
    },
  ];
  
  // Post data
  export const Posts: Post[] = [
    {
      id: 1,
      desc: "Love For All, Hatred For None.",
      photo: "https://picsum.photos/id/1015/600/400",
      date: "5 mins ago",
      userId: 1,
      like: 32,
      comment: 9,
    },
    {
      id: 2,
      photo: "https://picsum.photos/id/1016/600/400",
      date: "15 mins ago",
      userId: 2,
      like: 2,
      comment: 1,
    },
    {
      id: 3,
      desc: "Every moment is a fresh beginning.",
      photo: "https://picsum.photos/id/1020/600/400",
      date: "1 hour ago",
      userId: 3,
      like: 61,
      comment: 2,
    },
    {
      id: 4,
      photo: "https://picsum.photos/id/1035/600/400",
      date: "4 hours ago",
      userId: 4,
      like: 7,
      comment: 3,
    },
    {
      id: 5,
      photo: "https://picsum.photos/id/1043/600/400",
      date: "5 hours ago",
      userId: 5,
      like: 23,
      comment: 5,
    },
    {
      id: 6,
      photo: "https://picsum.photos/id/1050/600/400",
      date: "1 day ago",
      userId: 6,
      like: 44,
      comment: 6,
    },
    {
      id: 7,
      desc: "Never regret anything that made you smile.",
      photo: "https://picsum.photos/id/1062/600/400",
      date: "2 days ago",
      userId: 7,
      like: 52,
      comment: 3,
    },
    {
      id: 8,
      photo: "https://picsum.photos/id/1070/600/400",
      date: "3 days ago",
      userId: 8,
      like: 15,
      comment: 1,
    },
    {
      id: 9,
      desc: "Change the world by being yourself.",
      photo: "https://picsum.photos/id/1080/600/400",
      date: "5 days ago",
      userId: 9,
      like: 11,
      comment: 2,
    },
    {
      id: 10,
      photo: "https://picsum.photos/id/1050/600/400",
      date: "1 week ago",
      userId: 10,
      like: 104,
      comment: 12,
    },
  ];
  
  