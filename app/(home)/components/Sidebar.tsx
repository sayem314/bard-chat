import Link from "next/link";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import { FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import type { IconType } from "react-icons";

interface SidebarProps {
  currentHandle: string | null;
  children?: React.ReactNode;
}

interface NavItem {
  icon: IconType;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { icon: FaHome, label: "Home", href: "/feeds" },
  { icon: FaSearch, label: "Search", href: "/search" },
  { icon: FaBell, label: "Notifications", href: "/notifications" },
  { icon: FaEnvelope, label: "Messages", href: "/messages" },
  { icon: FaUser, label: "Profile", href: "/profile" }, // href will be dynamic
];

export function Sidebar({ currentHandle, children }: SidebarProps) {
  return (
    <div className="w-64 border-r border-gray-700 p-4 fixed h-screen">
      <div className="mb-8 flex items-center">
        <Image
          src="/images/Bluesky_Logo.svg"
          alt="Bluesky Logo"
          width={48}
          height={48}
          className="text-blue-500 dark:text-blue-400"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white ml-2">Bard Chat</h1>
      </div>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink key={item.label} item={item} currentHandle={currentHandle} />
        ))}
      </nav>

      {children}
    </div>
  );
}

function NavLink({ item, currentHandle }: { item: NavItem; currentHandle: string | null }) {
  const href = item.label === "Profile" && currentHandle ? `/profile/${currentHandle}` : item.href;

  return (
    <Link
      href={href}
      className="flex items-center space-x-3 p-3 rounded-full hover:bg-gray-700 transition-colors text-gray-200"
    >
      <item.icon className="w-6 h-6" />
      <span className="text-lg">{item.label}</span>
    </Link>
  );
}
