"use client";
import Image from "next/image";
import Link from "next/link";
import { IoLockClosed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <Image src="/images/Bluesky_Logo.svg" alt="Bluesky Logo" width={80} height={80} className="text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-3">Bard Chat</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">A modern client for the Bluesky social network</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Experience Bluesky in a whole new way. Connect, share, and explore with our intuitive and powerful interface.
        </p>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col space-y-4 w-80 max-w-full mb-12">
        <Link href="/signup">
          <button className="w-full bg-blue-500 text-white hover:bg-blue-600 h-12 text-lg font-medium rounded-lg transition-colors">
            Create account
          </button>
        </Link>
        <Link href="/login">
          <button className="w-full bg-gray-100 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 h-12 text-lg font-medium rounded-lg backdrop-blur-sm transition-colors">
            Sign in
          </button>
        </Link>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4 mb-16">
        <div className="text-center">
          <div className="mb-3 text-blue-500 dark:text-blue-400">
            <IoLockClosed className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Decentralized</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Own your data and control your social experience</p>
        </div>
        <div className="text-center">
          <div className="mb-3 text-blue-500 dark:text-blue-400">
            <FaUserFriends className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Community-Driven</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect with like-minded people in a vibrant ecosystem
          </p>
        </div>
        <div className="text-center">
          <div className="mb-3 text-blue-500 dark:text-blue-400">
            <MdOutlinePublic className="w-8 h-8 mx-auto" />
          </div>
          <h3 className="font-semibold mb-2">Open Protocol</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Built on the AT Protocol for true social networking freedom
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 flex flex-col items-center text-gray-500 dark:text-gray-400 space-y-3">
        <div className="flex space-x-6">
          <Link href="https://bsky.social/about">
            <button className="px-3 py-1 text-sm font-normal hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-transparent">
              Business
            </button>
          </Link>
          <Link href="https://bsky.social/about/blog">
            <button className="px-3 py-1 text-sm font-normal hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-transparent">
              Blog
            </button>
          </Link>
          <Link href="https://bsky.social/about/join">
            <button className="px-3 py-1 text-sm font-normal hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-transparent">
              Jobs
            </button>
          </Link>
          <Link href="https://bsky.social/about/support/privacy-policy">
            <button className="px-3 py-1 text-sm font-normal hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-transparent">
              Privacy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
