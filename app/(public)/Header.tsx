"use client";
import { useRouter } from "next/navigation";
import { MdMenu, MdClose } from "react-icons/md";
import Image from "next/image";

interface Props {
  isMobileSidebarOpen: boolean;
  setMobileSidebarOpen: (isOpen: boolean) => void;
}

export const Header: React.FC<Props> = ({ isMobileSidebarOpen, setMobileSidebarOpen }) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex justify-between items-center shadow-sm z-10">
      <div className="flex items-center space-x-3">
        <button
          className="lg:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          {isMobileSidebarOpen ? <MdClose className="text-2xl" /> : <MdMenu className="text-2xl" />}
        </button>

        <button onClick={() => router.push("/")} className="flex items-center space-x-2">
          <Image src="/images/Bluesky_Logo.svg" alt="Bard Chat" width={32} height={32} priority />
          <span className="text-lg font-bold text-gray-800 dark:text-gray-200">Bard Chat</span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign up
        </button>
      </div>
    </header>
  );
};
