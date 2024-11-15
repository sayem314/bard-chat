import { Provider } from "./provider";
import { Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const font = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | BlueSky Client",
    default: "BlueSky Social Client",
  },
  description: "A modern client application for BlueSky Social, the decentralized social network.",
  keywords: ["bluesky", "social network", "at protocol", "decentralized", "social media", "client"],
  authors: [{ name: "Sayem Chowdhury" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bsky.app",
    siteName: "BlueSky Client",
    title: "BlueSky Social Client",
    description: "A modern client application for BlueSky Social, the decentralized social network.",
  },
  twitter: {
    card: "summary",
    title: "BlueSky Social Client",
    description: "A modern client application for BlueSky Social, the decentralized social network.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
