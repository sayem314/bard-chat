import { FaSignOutAlt } from "react-icons/fa";
import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface UserProfileProps {
  profile: ProfileViewDetailed;
  onLogout: () => void;
}

export function UserProfile({ profile, onLogout }: UserProfileProps) {
  return (
    <div className="absolute bottom-4 w-[calc(100%-2rem)]">
      <div className="p-3 flex items-center space-x-3 hover:bg-gray-700 rounded-full cursor-pointer text-gray-200">
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
        <div className="flex-1">
          <p className="font-semibold truncate">{profile.displayName}</p>
          <p className="text-gray-400 text-sm truncate">@{profile.handle}</p>
        </div>
        <button onClick={onLogout} className="p-2 text-red-400 hover:bg-gray-600 rounded-full">
          <FaSignOutAlt className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
