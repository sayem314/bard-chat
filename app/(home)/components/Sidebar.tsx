import Link from "next/link";
import { MdHome, MdSearch, MdNotifications, MdPerson, MdEdit } from "react-icons/md";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

interface SidebarProps {
  children?: React.ReactNode;
}

interface NavItem {
  icon: IconType;
  label: string;
  href: string;
}

export const navigationItems: NavItem[] = [
  { icon: MdHome, label: "Home", href: "/feeds" },
  { icon: MdSearch, label: "Search", href: "/search" },
  { icon: MdNotifications, label: "Notifications", href: "/notifications" },
  { icon: MdPerson, label: "Profile", href: "/profile" },
];

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="w-56 border-r border-gray-700 p-3 fixed h-screen flex flex-col space-y-3">
      {children}

      <nav className="space-y-1">
        {navigationItems.map((item) => (
          <NavLink key={item.label} item={item} pathname={pathname} />
        ))}
      </nav>

      <Link
        href="/compose"
        className="flex items-center justify-center space-x-2 p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
      >
        <MdEdit size={20} />
        <span className="text-base">New Post</span>
      </Link>

      <div className="flex-1" />
    </div>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex items-center space-x-2 p-2 rounded-full transition-colors hover:bg-gray-700
        ${isActive ? "text-white font-semibold" : "text-gray-300"}`}
    >
      <item.icon size={20} />
      <span className="text-base">{item.label}</span>
    </Link>
  );
}
