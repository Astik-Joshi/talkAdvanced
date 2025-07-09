import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Users, MessageSquare, Settings, UserPlus, X, Crown, Globe, Languages, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroupMember, getGroupDetails, addGroupMembers } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { useState } from "react";
import AddMembersModal from "./AddMembersModal";


const GroupDetails = () => {
  const { id } = useParams();
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [showAddMembers, setShowAddMembers] = useState(false);

  const { data: group, isLoading } = useQuery({
    queryKey: ["group", id],
    queryFn: () => getGroupDetails(id),
  });

  const { mutate: removeMember, isPending: isRemoving } = useMutation({
    mutationFn: (memberId) => removeGroupMember(id, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries(["group", id]);
      queryClient.invalidateQueries(["groups"]);
      toast.success("Member removed successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to remove member");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="relative">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <div className="absolute inset-0 loading loading-spinner loading-lg text-secondary opacity-50 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="text-center py-20 bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-3xl">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-error/20 rounded-full flex items-center justify-center">
            <X className="h-8 w-8 text-error" />
          </div>
          <h3 className="text-2xl font-bold text-error">Group not found</h3>
        </div>
      </div>
    );
  }

  const isAdmin = group.admin._id === authUser._id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30">
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
              <div className="relative">
                <Users className="h-8 w-8 text-primary drop-shadow-lg" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              {group.name}
            </h2>
            <p className="text-base-content/70 text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" />
              {group.members.length} members • {group.language || "English"}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/group-chat/${group._id}`}
              className="btn btn-primary btn-lg gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
            >
              <MessageSquare className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Join Chat
            </Link>
            {isAdmin && (
              <button
                onClick={() => setShowAddMembers(true)}
                className="btn btn-outline btn-lg gap-3 hover:btn-secondary shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <UserPlus className="h-5 w-5" />
                Add Members
              </button>
            )}
          </div>
        </div>

        {/* Group Info Card */}
        <div className="card bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300/50 shadow-2xl overflow-hidden">
          <figure className="relative h-64 overflow-hidden">
            <img
              src={group.image || "/default-group.jpg"}
              alt={group.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Admin Badge */}
            {isAdmin && (
              <div className="absolute top-4 right-4 badge badge-primary badge-lg gap-2 shadow-xl backdrop-blur-sm">
                <Crown className="h-4 w-4" />
                You're Admin
              </div>
            )}
          </figure>
          
          <div className="card-body p-8 space-y-6">
            <div className="space-y-4">
              <p className="text-lg text-base-content/80 leading-relaxed">
                {group.description || "Welcome to this amazing language learning community!"}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="badge badge-primary badge-lg gap-2">
                  <Languages className="h-4 w-4" />
                  {group.language || "English"}
                </div>
                <div className="badge badge-secondary badge-lg gap-2">
                  <Users className="h-4 w-4" />
                  {group.members.length} members
                </div>
                <div className="badge badge-accent badge-lg gap-2">
                  <Heart className="h-4 w-4" />
                  Learning Community
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
              <Users className="h-6 w-6" />
              Members ({group.members.length})
            </h3>
            <Sparkles className="h-6 w-6 text-accent animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.members.map((member, index) => (
              <div
                key={member._id}
                className="group/member card bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300/50 hover:border-primary/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="card-body p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="avatar">
                          <div className="w-16 rounded-full ring-4 ring-primary/20 group-hover/member:ring-primary/40 transition-all duration-300">
                            <img src={member.profilePic} alt={member.fullName} />
                          </div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                          <div className="w-2 h-2 bg-base-100 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-lg text-primary group-hover/member:text-secondary transition-colors duration-300">
                            {member.fullName}
                          </p>
                          {group.admin._id === member._id && (
                            <div className="badge badge-primary badge-sm gap-1">
                              <Crown className="h-3 w-3" />
                              Admin
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-base-content/70 flex items-center gap-2">
                          <Languages className="h-4 w-4" />
                          {member.nativeLanguage} → {member.learningLanguage}
                        </p>
                      </div>
                    </div>
                    
                    {(isAdmin || member._id === authUser._id) && group.admin._id !== member._id && (
                      <button
                        onClick={() => removeMember(member._id)}
                        className="btn btn-error btn-outline btn-sm gap-2 hover:btn-error hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        disabled={isRemoving}
                      >
                        <X className="h-4 w-4" />
                        {member._id === authUser._id ? "Leave" : "Remove"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAddMembers && (
          <AddMembersModal
            group={group}
            onClose={() => setShowAddMembers(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupDetails;