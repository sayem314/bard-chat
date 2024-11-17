"use client";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { accountsAtom } from "@/lib/atoms/user";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdHome, MdSearch, MdNotifications, MdPerson, MdEdit } from "react-icons/md";

const navigationItems = [
  { icon: MdHome, label: "Home", href: "/feeds" },
  { icon: MdSearch, label: "Search", href: "/search" },
  { icon: MdNotifications, label: "Notifications", href: "/notifications" },
  { icon: MdPerson, label: "Profile", href: "/profile" },
];

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [{ currentProfile }, setAccounts] = useAtom(accountsAtom);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setAccounts({ accounts: [], currentAccount: null, currentProfile: null });
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto relative">
        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
          <nav className="flex justify-around p-2">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`p-2 rounded-full transition-colors
                  ${pathname === item.href ? "text-blue-500" : "text-gray-700 dark:text-gray-300"}`}
              >
                <item.icon size={24} />
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center">
          {/* Left Sidebar - Hide on mobile */}
          <div className="hidden md:block w-[16rem] border-r border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800 fixed left-[max(0px,calc((100%-72rem)/2))]">
            <div className="h-screen flex flex-col p-3 space-y-3">
              {/* User Profile */}
              {currentProfile && (
                <div className="w-full">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-700/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <div className="shrink-0">
                      <Image
                        src={currentProfile.avatar || "/default-avatar.png"}
                        alt={`${currentProfile.displayName}'s avatar`}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                        priority
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-gray-900 dark:text-white text-ellipsis overflow-hidden whitespace-nowrap">
                        {currentProfile.displayName}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                        @{currentProfile.handle}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center space-x-2 p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700
                      ${
                        pathname === item.href
                          ? "text-gray-900 dark:text-white font-semibold"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                  >
                    <item.icon size={20} />
                    <span className="text-base">{item.label}</span>
                  </Link>
                ))}
              </nav>

              {/* Compose Button */}
              <Link
                href="/compose"
                className="flex items-center justify-center space-x-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
              >
                <MdEdit size={20} />
                <span className="text-base">New Post</span>
              </Link>
            </div>
          </div>

          {/* Main Content - Adjust width for mobile */}
          <main className="w-full md:w-[600px] md:ml-[16rem] md:mr-[20rem] min-h-screen border-x border-gray-200 dark:border-gray-700">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              {currentProfile && (
                <div className="flex items-center gap-2">
                  <Image
                    src={currentProfile.avatar || "/default-avatar.png"}
                    alt={`${currentProfile.displayName}'s avatar`}
                    width={32}
                    height={32}
                    className="rounded-full object-cover w-8 h-8"
                    priority
                  />
                  <span className="font-medium text-gray-900 dark:text-white">{currentProfile.displayName}</span>
                </div>
              )}
              <Link
                href="/compose"
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
              >
                <MdEdit size={20} />
              </Link>
            </div>
            <div className="w-full pb-16 md:pb-0">{children}</div>
          </main>

          {/* Right Sidebar - Hide on mobile */}
          <div className="hidden md:block w-[20rem] flex-shrink-0 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 fixed right-[max(0px,calc((100%-72rem)/2))] top-0 z-30">
            <div className="h-screen">
              <div className="p-4">
                <div className="sticky top-2">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <MdSearch className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
                    </div>
                    <input
                      type="search"
                      placeholder="Search"
                      className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-gray-800 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
