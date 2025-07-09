// NoNotificationsFound.jsx
import { BellIcon, SparklesIcon, UsersIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {/* Icon Container */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-2xl shadow-primary/25 border-4 border-base-100">
          <BellIcon className="w-16 h-16 text-primary-content" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-warning to-warning/80 rounded-full flex items-center justify-center shadow-lg border-2 border-base-100">
          <SparklesIcon className="w-5 h-5 text-warning-content" strokeWidth={2} />
        </div>
      </div>
      
      {/* Text Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-3xl font-bold text-base-content">
          No notifications yet
        </h3>
        
        <p className="text-base-content/70 text-lg leading-relaxed">
          When you receive friend requests or messages, they'll appear here with beautiful animations.
        </p>
      </div>
      
      {/* Action Button */}
      <div className="mt-10">
        <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-3">
          <UsersIcon className="w-6 h-6" strokeWidth={2} />
          <span className="font-semibold">Start connecting with language partners!</span>
        </button>
      </div>
    </div>
  );
}

export default NoNotificationsFound;
