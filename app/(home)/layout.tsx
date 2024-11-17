"use client";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { accountsAtom } from "@/lib/atoms/user";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { UserProfile } from "./components/UserProfile";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [{ currentAccount }, setAccounts] = useAtom(accountsAtom);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    setAccounts({ accounts: [], currentAccount: null });
    router.push("/login");
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <Sidebar currentHandle={currentAccount?.handle ?? null}>
        {currentAccount && <UserProfile handle={currentAccount.handle} onLogout={handleLogout} />}
      </Sidebar>
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}
