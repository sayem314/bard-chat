import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Initialize the relative time plugin
dayjs.extend(relativeTime);

interface PostCardProps {
  post: FeedViewPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { author, record, indexedAt } = post.post;
  const postRecord = record as { text: string };

  return (
    <Card className="w-full">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar src={author.avatar} alt={author.displayName || author.handle} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none">{author.displayName || author.handle}</h4>
            <p className="text-tiny text-default-500">@{author.handle}</p>
          </div>
        </div>
        <div className="text-tiny text-default-500">{dayjs(indexedAt).fromNow()}</div>
      </CardHeader>
      <CardBody className="text-small">
        <p>{postRecord.text}</p>
      </CardBody>
    </Card>
  );
}
