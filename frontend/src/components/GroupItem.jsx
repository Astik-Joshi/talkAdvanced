import { Link } from "react-router-dom";
import { Users, MessageSquare, Languages, Globe, Sparkles } from "lucide-react";

const GroupItem = ({ group }) => {
  return (
    <div className="card bg-gradient-to-br from-base-100 to-base-200/50 hover:from-base-200/50 hover:to-base-300/30 transition-all duration-500 shadow-2xl hover:shadow-3xl group overflow-hidden border border-base-300/50 hover:border-primary/50 transform hover:-translate-y-2">
      <div className="relative overflow-hidden">
        {/* Group Cover Image */}
        <figure className="h-48 overflow-hidden relative">
          <img 
            src={group.image || "/default-group-cover.jpg"} 
            alt={group.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Floating sparkles */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
        </figure>
        
        {/* Members Badge */}
        <div className="absolute top-4 left-4 badge badge-primary badge-lg gap-2 shadow-xl backdrop-blur-sm">
          <Users className="h-4 w-4" />
          <span>{group.members?.length || 0} members</span>
        </div>

        {/* Language Badge */}
        <div className="absolute bottom-4 left-4 badge badge-secondary badge-lg gap-2 shadow-xl backdrop-blur-sm">
          <Languages className="h-4 w-4" />
          {group.language || "English"}
        </div>
      </div>
      
      <div className="card-body p-6 space-y-4">
        <h2 className="card-title text-2xl font-bold text-primary group-hover:text-secondary transition-colors duration-300 flex items-center gap-2">
          <Globe className="h-6 w-6" />
          <span className="truncate">{group.name}</span>
        </h2>
        
        <p className="text-base-content/70 line-clamp-2 leading-relaxed">
          {group.description || "Join this amazing language learning community!"}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <div className="badge badge-outline badge-primary gap-2 hover:badge-primary transition-all duration-300">
            <Languages className="h-4 w-4" />
            {group.language || "English"}
          </div>
          <div className="badge badge-outline badge-secondary gap-2 hover:badge-secondary transition-all duration-300">
            <Users className="h-4 w-4" />
            {group.members?.length || 0} learners
          </div>
        </div>
        
        <div className="card-actions justify-end mt-6">
          <Link 
            to={`/group-chat/${group._id}`} 
            className="btn btn-primary gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn"
          >
            <MessageSquare className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            Join Chat
            <Sparkles className="h-4 w-4 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default GroupItem;