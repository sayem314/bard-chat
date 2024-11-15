"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Provider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextUIProvider
      className="container text-foreground bg-background mx-auto flex-grow max-w-full"
      navigate={router.push}
    >
      <NextThemesProvider attribute="class">{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
