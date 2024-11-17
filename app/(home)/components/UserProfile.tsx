import Image from "next/image";
import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface UserProfileProps {
  profile: ProfileViewDetailed;
  onLogout: () => void;
}

export function UserProfile({ profile }: UserProfileProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 px-3 py-2xx rounded-xl bg-gray-800 hover:bg-gray-700/80 transition-colors">
        <div className="shrink-0">
          <Image
            src={profile.avatar || "/default-avatar.png"}
            alt={`${profile.displayName}'s avatar`}
            width={40}
            height={40}
            className="rounded-full object-cover w-10 h-10"
            priority
          />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="font-medium text-white text-ellipsis overflow-hidden whitespace-nowrap">
            {profile.displayName}
          </p>
          <p className="text-gray-400 text-sm text-ellipsis overflow-hidden whitespace-nowrap">@{profile.handle}</p>
        </div>
      </div>
    </div>
  );
}
