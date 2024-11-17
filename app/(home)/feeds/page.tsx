"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { accountsAtom } from "@/lib/atoms/user";
import { AtpAgent } from "@atproto/api";
import { Tabs, Tab, Card, Spinner } from "@nextui-org/react";
import { FaRegComment, FaRetweet, FaRegHeart } from "react-icons/fa";
import type { AppBskyFeedPost } from "@atproto/api";
import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export default function FeedsPage() {
  const [{ currentAccount }] = useAtom(accountsAtom);
  const router = useRouter();
  const [feeds, setFeeds] = useState<FeedViewPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState("following");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentAccount) {
      router.push("/login");
      return;
    }

    const fetchFeed = async () => {
      try {
        const agent = new AtpAgent({ service: currentAccount.host });
        await agent.resumeSession({
          did: currentAccount.did,
          handle: currentAccount.handle,
          accessJwt: currentAccount.accessJwt,
          refreshJwt: currentAccount.refreshJwt,
          active: currentAccount.active ?? true,
          ...(currentAccount.didDoc && { didDoc: currentAccount.didDoc }),
          ...(currentAccount.email && { email: currentAccount.email }),
          ...(currentAccount.emailConfirmed !== undefined && {
            emailConfirmed: currentAccount.emailConfirmed,
          }),
        });

        const { data } = await agent.getTimeline({ limit: 50 });
        setFeeds(data.feed);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred while fetching the feed");
      } finally {
        setIsLoading(false);
      }
    };

    if (currentAccount) {
      fetchFeed();
    }
  }, [currentAccount, router, selectedFeed]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto py-2">
      <div className="sticky top-0 z-10 backdrop-blur-sm">
        <div className="px-4 pt-2 flex justify-center">
          <Image
            src="/images/Bluesky_Logo.svg"
            alt="Bluesky Logo"
            width={32}
            height={32}
            className="text-blue-500 dark:text-blue-400"
          />
        </div>
        <Tabs
          selectedKey={selectedFeed}
          onSelectionChange={(key) => setSelectedFeed(key.toString())}
          aria-label="Feed options"
          variant="underlined"
        >
          <Tab
            key="following"
            title={
              <div className="flex items-center justify-center space-x-2">
                <span>Following</span>
              </div>
            }
          />
          <Tab
            key="discover"
            title={
              <div className="flex items-center justify-center space-x-2">
                <span>Discover</span>
              </div>
            }
          />
        </Tabs>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {feeds.map((item) => (
          <Card
            key={item.post.uri}
            className="bg-transparent shadow-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-none p-4"
          >
            <div className="flex items-start space-x-3">
              {item.post.author.avatar && (
                <Image
                  src={item.post.author.avatar}
                  alt={item.post.author.handle}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-900 dark:text-white hover:underline">
                    {item.post.author.displayName || item.post.author.handle}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">@{item.post.author.handle}</span>
                </div>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {(item.post.record as AppBskyFeedPost.Record).text}
                </p>
                {item.post.embed && "images" in item.post.embed && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(item.post.embed.images as Array<{ thumb: string; fullsize: string; alt: string }>).map(
                      (img, index) => (
                        <Image
                          key={index}
                          src={img.fullsize}
                          alt={img.alt || ""}
                          width={300}
                          height={192}
                          className="rounded-lg object-cover"
                        />
                      ),
                    )}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 max-w-md">
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 group">
                    <FaRegComment className="w-5 h-5" />
                    <span>{item.post.replyCount}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 group">
                    <FaRetweet className="w-5 h-5" />
                    <span>{item.post.repostCount}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 group">
                    <FaRegHeart className="w-5 h-5" />
                    <span>{item.post.likeCount}</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
