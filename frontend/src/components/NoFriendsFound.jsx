// NoFriendsFound.jsx
import { UsersIcon, HeartIcon } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="card bg-gradient-to-br from-base-200 to-base-300 shadow-xl border border-base-300 overflow-hidden">
      <div className="card-body p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-warning to-warning/80 rounded-full flex items-center justify-center shadow-lg">
            <UsersIcon className="w-10 h-10 text-warning-content" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* Content */}
        <h3 className="text-2xl font-bold text-base-content mb-4 flex items-center justify-center gap-2">
          No friends yet 
          <HeartIcon className="w-6 h-6 text-error fill-current" />
        </h3>
        
        <p className="text-base-content/70 text-lg leading-relaxed max-w-sm mx-auto">
          Connect with language partners below to start practicing together!
        </p>
      </div>
    </div>
  );
};

export default NoFriendsFound;
