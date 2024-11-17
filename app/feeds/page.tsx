"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAtom } from "jotai";
import { accountsAtom } from "@/lib/atoms/user";
import { BskyAgent } from "@atproto/api";
import { useRouter } from "next/navigation";
import { Tabs, Tab, Card, Spinner } from "@nextui-org/react";
import type { AppBskyFeedPost } from "@atproto/api";
import type { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export default function FeedsPage() {
  const [{ currentAccount }] = useAtom(accountsAtom);
  const router = useRouter();
  const [feeds, setFeeds] = useState<FeedViewPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState("following");

  useEffect(() => {
    if (!currentAccount) {
      router.push("/login");
      return;
    }

    const fetchFeed = async () => {
      try {
        if (!currentAccount) {
          return;
        }

        const agent = new BskyAgent({ service: currentAccount.host });
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
      } catch (error) {
        console.error("Error fetching feed:", error);
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

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Tabs selectedKey={selectedFeed} onSelectionChange={(key) => setSelectedFeed(key.toString())} className="mb-6">
        <Tab key="following" title="Following" />
        <Tab key="popular" title="Popular" />
      </Tabs>

      <div className="space-y-4">
        {feeds.map((item) => (
          <Card key={item.post.uri} className="p-4">
            <div className="flex items-start space-x-3">
              {item.post.author.avatar && (
                <Image
                  src={item.post.author.avatar}
                  alt={item.post.author.handle}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{item.post.author.displayName || item.post.author.handle}</span>
                  <span className="text-gray-500">@{item.post.author.handle}</span>
                </div>
                <p className="mt-1">{(item.post.record as AppBskyFeedPost.Record).text}</p>
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
                <div className="flex items-center space-x-6 mt-3 text-gray-500">
                  <span>💬 {item.post.replyCount}</span>
                  <span>🔄 {item.post.repostCount}</span>
                  <span>❤️ {item.post.likeCount}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
