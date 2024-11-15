"use client";
import { BiMessageRounded, BiRepost, BiHeart, BiShareAlt } from "react-icons/bi";
import { BsCheckCircleFill } from "react-icons/bs";
import Image from "next/image";

interface Post {
  id: number;
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
  isVerified?: boolean;
}

const POSTS: Post[] = [
  {
    id: 1,
    author: "John Doe",
    handle: "@johndoe",
    content:
      "Just built my first Next.js app! 🚀\n\nThe developer experience is amazing. Can't wait to build more with this stack! #NextJS #WebDev",
    timestamp: "2h ago",
    likes: 42,
    comments: 5,
    reposts: 2,
    isVerified: true,
  },
  {
    id: 2,
    author: "Jane Smith",
    handle: "@janesmith",
    content:
      "🎨 Working on some new UI designs for our latest project. Design systems are crucial for maintaining consistency across large applications.\n\nWhat tools do you use for your design workflow?",
    timestamp: "4h ago",
    likes: 128,
    comments: 24,
    reposts: 8,
    isVerified: true,
  },
  {
    id: 3,
    author: "Tech News",
    handle: "@technews",
    content:
      "Breaking: Major updates coming to React 19! 🔥\n\nNew features include:\n- Built-in Suspense improvements\n- Enhanced Server Components\n- Better debugging tools\n\nStay tuned for more details! #React #JavaScript",
    timestamp: "5h ago",
    likes: 543,
    comments: 89,
    reposts: 112,
    isVerified: true,
  },
  {
    id: 4,
    author: "Alice Developer",
    handle: "@alicedev",
    content:
      "Today's coding tip: Always write tests for your components! 🧪\n\nIt might seem like extra work now, but it'll save you hours of debugging later.",
    timestamp: "6h ago",
    likes: 76,
    comments: 12,
    reposts: 5,
    isVerified: true,
  },
];

const PostInteractions = ({ post }: { post: Post }) => {
  return (
    <div className="flex justify-between mt-3 max-w-md text-gray-500 text-sm">
      <button className="hover:text-[#1d9bf0] group flex items-center gap-1">
        <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10">
          <BiMessageRounded className="w-5 h-5" />
        </div>
        <span>{post.comments}</span>
      </button>
      <button className="hover:text-green-500 group flex items-center gap-1">
        <div className="p-2 rounded-full group-hover:bg-green-500/10">
          <BiRepost className="w-5 h-5" />
        </div>
        <span>{post.reposts}</span>
      </button>
      <button className="hover:text-pink-600 group flex items-center gap-1">
        <div className="p-2 rounded-full group-hover:bg-pink-600/10">
          <BiHeart className="w-5 h-5" />
        </div>
        <span>{post.likes}</span>
      </button>
      <button className="hover:text-[#1d9bf0] group flex items-center">
        <div className="p-2 rounded-full group-hover:bg-[#1d9bf0]/10">
          <BiShareAlt className="w-5 h-5" />
        </div>
      </button>
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="max-w-[600px] mx-auto">
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {POSTS.map((post) => (
            <article
              key={post.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer transition-colors"
            >
              <div className="flex gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <Image
                    src="https://avatars.githubusercontent.com/u/14138401?v=4"
                    alt={`${post.author}'s avatar`}
                    className="rounded-full bg-gray-200 dark:bg-gray-800"
                    fill
                    sizes="48px"
                    priority={post.id <= 2}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-bold hover:underline">{post.author}</span>
                    {post.isVerified && <BsCheckCircleFill className="w-4 h-4 text-[#1d9bf0]" />}
                    <span className="text-gray-500 text-sm">{post.handle}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm hover:underline">{post.timestamp}</span>
                  </div>
                  <p className="mt-1 text-[15px] whitespace-pre-wrap">{post.content}</p>
                  <PostInteractions post={post} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
