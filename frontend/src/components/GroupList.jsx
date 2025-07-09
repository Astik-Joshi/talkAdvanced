import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users, MessageSquare, Settings, UserPlus, Crown, Sparkles, Heart, Globe } from "lucide-react";
import { useState } from "react";
import CreateGroup from "./CreateGroup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { addGroupMembers, getMyGroups } from "../lib/api";
import AddMembersModal from "./AddMembersModal";

const GroupList = () => {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const { data: groups = [], isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: getMyGroups,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200/50 to-base-300/30">
      {/* Floating background elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative p-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
              <div className="relative">
                <Users className="h-8 w-8 text-primary drop-shadow-lg" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
              </div>
              Your Groups
            </h2>
            <p className="text-base-content/70 text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" />
              Connect and chat with language learning communities
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary btn-lg gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            Create Group
            <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        {groups.length === 0 ? (
          <div className="text-center py-20 bg-gradient-to-br from-base-200/50 to-base-300/30 rounded-3xl border border-primary/20 shadow-2xl backdrop-blur-sm">
            <div className="max-w-md mx-auto space-y-6">
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-2xl">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Plus className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-primary">No Groups Yet</h3>
              <p className="text-base-content/70 text-lg leading-relaxed">
                Create your first group to start amazing conversations with multiple language partners at once.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary btn-lg gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Plus className="h-5 w-5" />
                Create Your First Group
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group, index) => (
              <div
                key={group._id}
                className="group card bg-gradient-to-br from-base-100 to-base-200/50 border border-base-300/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src="/w.png"
                    alt={group.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Admin Badge */}
                  {group.admin._id === localStorage.getItem("userId") && (
                    <div className="absolute top-3 right-3 badge badge-primary badge-lg gap-2 shadow-lg backdrop-blur-sm">
                      <Crown className="h-4 w-4" />
                      Admin
                    </div>
                  )}
                  
                  {/* Members Count */}
                  <div className="absolute bottom-3 left-3 badge badge-secondary badge-lg gap-2 shadow-lg backdrop-blur-sm">
                    <Users className="h-4 w-4" />
                    {group.members.length} members
                  </div>
                </figure>

                <div className="card-body p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="card-title text-xl font-bold text-primary group-hover:text-secondary transition-colors duration-300">
                      {group.name}
                    </h3>
                    <p className="text-base-content/70 line-clamp-2 text-sm leading-relaxed">
                      {group.description || "No description provided"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-primary">
                      {group.language || "English"}
                    </div>
                    <div className="badge badge-outline badge-secondary">
                      {group.members.length} members
                    </div>
                  </div>

                  <div className="card-actions justify-between items-center pt-4">
                    <div className="flex gap-2">
                      <Link
                        to={`/group-chat/${group._id}`}
                        className="btn btn-primary btn-sm gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </Link>
                      <Link 
                        to={`/groups/${group._id}`} 
                        className="btn btn-outline btn-sm hover:btn-secondary transition-all duration-300"
                      >
                        Details
                      </Link>
                    </div>

                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-sm btn-circle hover:btn-primary transition-all duration-300"
                      >
                        <Settings className="h-4 w-4" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-52 border border-base-300 backdrop-blur-sm"
                      >
                        <li>
                          <button
                            onClick={() => setSelectedGroup(group)}
                            className="text-sm gap-3 hover:bg-primary/10 transition-colors duration-300"
                          >
                            <UserPlus className="h-4 w-4" />
                            Add Members
                          </button>
                        </li>
                        {group.admin._id === localStorage.getItem("userId") && (
                          <li>
                            <button className="text-sm gap-3 text-error hover:bg-error/10 transition-colors duration-300">
                              <Settings className="h-4 w-4" />
                              Delete Group
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}

        {showCreateModal && (
          <CreateGroup onClose={() => setShowCreateModal(false)} />
        )}

        {selectedGroup && (
          <AddMembersModal
            group={selectedGroup}
            onClose={() => setSelectedGroup(null)}
          />
        )}
      </div>
    </div>
  );
};

export default GroupList;