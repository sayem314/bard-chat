"use client";
import Image from "next/image";
import Link from "next/link";
import { IoLockClosed } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlinePublic } from "react-icons/md";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/Bluesky_Logo.svg"
              alt="Bluesky Logo"
              width={64}
              height={64}
              className="text-blue-500 dark:text-blue-400"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            Bard Chat
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            A modern client for the Bluesky social network
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Experience Bluesky in a whole new way. Connect, share, and explore with our intuitive and powerful
            interface.
          </p>
        </div>

        {/* Main Actions */}
        <div className="flex flex-col space-y-3 w-80 max-w-full mb-12">
          <Link href="/signup" className="w-full">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-11 text-base font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20 dark:shadow-blue-500/10 hover:shadow-blue-500/30 dark:hover:shadow-blue-500/20">
              Create account
            </button>
          </Link>
          <Link href="/login" className="w-full">
            <button className="w-full bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 h-11 text-base font-medium rounded-xl transition-all border border-gray-200 dark:border-gray-600/50">
              Sign in
            </button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-3 text-blue-500 dark:text-blue-400">
              <IoLockClosed className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Decentralized</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Own your data and control your social experience</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-3 text-blue-500 dark:text-blue-400">
              <FaUserFriends className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Community-Driven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Connect with like-minded people in a vibrant ecosystem
            </p>
          </div>
          <div className="text-center p-6 rounded-xl bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50 hover:scale-[1.02] transition-transform duration-300">
            <div className="mb-3 text-blue-500 dark:text-blue-400">
              <MdOutlinePublic className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">Open Protocol</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Built on the AT Protocol for true social networking freedom
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <Link href="https://bsky.social/about">
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Business</span>
          </Link>
          <Link href="https://bsky.social/about/blog">
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Blog</span>
          </Link>
          <Link href="https://bsky.social/about/join">
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Jobs</span>
          </Link>
          <Link href="https://bsky.social/about/support/privacy-policy">
            <span className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">Privacy</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
