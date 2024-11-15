"use client";
import { useState, useRef, useEffect, type JSX } from "react";
import { useRouter, usePathname } from "next/navigation";
import { MdHome, MdRssFeed, MdSearch } from "react-icons/md";
import { Header } from "./Header";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const renderSidebarButton = (label: string, icon: JSX.Element, path: string) => (
    <a
      onClick={() => {
        setMobileSidebarOpen(false);
        router.push(path);
      }}
      className={`flex items-center gap-3 px-4 py-2 text-sm ${
        pathname === path
          ? "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium"
          : "text-gray-700 dark:text-gray-300"
      } hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all duration-200 ease-in-out`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <nav className="flex-grow space-y-1 p-4">
        {renderSidebarButton("Home", <MdHome className="text-xl" />, "/")}
        {renderSidebarButton("Feeds", <MdRssFeed className="text-xl" />, "/feeds")}
        {renderSidebarButton("Search", <MdSearch className="text-xl" />, "/search")}

        <div className="space-y-1 mt-8">
          <div className="px-4 pt-1 pb-0.5 text-xs font-semibold text-gray-500 uppercase">Theme</div>
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <Header isMobileSidebarOpen={isMobileSidebarOpen} setMobileSidebarOpen={setMobileSidebarOpen} />

      <div className="flex flex-grow overflow-hidden">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex flex-col w-64 min-w-[16rem] bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex-grow overflow-y-auto">{sidebarContent}</div>
        </div>

        {/* Mobile/Tablet sidebar */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-gray-600 bg-opacity-75 transition-opacity">
            <div
              ref={sidebarRef}
              className="fixed inset-y-0 left-0 w-64 min-w-[16rem] bg-white dark:bg-gray-800 shadow-xl transition-transform overflow-y-auto"
            >
              {sidebarContent}
            </div>
          </div>
        )}

        <main className="flex-grow p-4 overflow-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </section>
  );
}
