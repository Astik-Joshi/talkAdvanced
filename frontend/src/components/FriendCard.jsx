import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircleIcon, UserIcon, GlobeIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div className="group card bg-base-200 hover:bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-base-300 hover:border-primary/30 animate-fade-in">
      <div className="card-body p-6 space-y-4">
        {/* USER INFO */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="avatar size-16 rounded-full ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
              <img 
                src={friend.profilePic} 
                alt={friend.fullName}
                className="rounded-full object-cover"
              />
            </div>
            {/* Online status indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
              <div className="w-2 h-2 bg-base-100 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors duration-300 truncate">
              {friend.fullName}
            </h3>
            <div className="flex items-center text-sm text-base-content/70 mt-1">
              <UserIcon className="size-3 mr-1 text-primary" />
              Language Partner
            </div>
          </div>
        </div>

        {/* Languages with enhanced styling */}
        <div className="flex flex-wrap gap-2">
          <span className="badge badge-lg badge-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="mr-1">{getLanguageFlag(friend.nativeLanguage)}</span>
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-lg badge-outline badge-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <span className="mr-1">{getLanguageFlag(friend.learningLanguage)}</span>
            Learning: {friend.learningLanguage}
          </span>
        </div>

        {/* Connection indicator */}
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <GlobeIcon className="size-4 text-secondary" />
            <span>Connected</span>
          </div>
        </div>

        {/* Enhanced Message Button */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary w-full text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn"
        >
          <MessageCircleIcon className="size-5 mr-2 group-hover/btn:scale-110 transition-transform" />
          Message
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-secondary/0 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-500 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-4 w-5 mr-1 inline-block rounded-sm object-cover shadow-sm"
      />
    );
  }
  return null;
}
