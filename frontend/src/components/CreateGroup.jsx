import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UserPlus, X, ImagePlus, Sparkles, Users, Globe, Languages } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { createGroup, getRecommendedUsers } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";

const CreateGroup = ({ onClose }) => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupData, setGroupData] = useState({
    name: "",
    description: "",
    language: "English",
  });

  const { data: recommendedUsers = [] } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries(["groups"]);
      toast.success("Group created successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create group");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupData.name) {
      toast.error("Group name is required");
      return;
    }
    mutate({
      ...groupData,
      members: selectedFriends.map((friend) => friend._id),
    });
  };

  const toggleFriendSelection = (friend) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f._id === friend._id)
        ? prev.filter((f) => f._id !== friend._id)
        : [...prev, friend]
    );
  };

  const filteredUsers = recommendedUsers.filter(
    (user) =>
      user._id !== authUser._id &&
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-4xl bg-gradient-to-br from-base-100 to-base-200/50 border border-primary/20 shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-primary/20">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary">Create New Group</h3>
              <p className="text-base-content/70">Build your language learning community</p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-ghost btn-circle hover:btn-error transition-all duration-300">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Group Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Group Name
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered input-primary w-full focus:shadow-lg transition-all duration-300"
                placeholder="Enter group name..."
                value={groupData.name}
                onChange={(e) =>
                  setGroupData({ ...groupData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2">
                  <Languages className="h-4 w-4 text-secondary" />
                  Language
                </span>
              </label>
              <select
                className="select select-bordered select-primary w-full focus:shadow-lg transition-all duration-300"
                value={groupData.language}
                onChange={(e) =>
                  setGroupData({ ...groupData, language: e.target.value })
                }
              >
                <option value="English">🇺🇸 English</option>
                <option value="Spanish">🇪🇸 Spanish</option>
                <option value="French">🇫🇷 French</option>
                <option value="German">🇩🇪 German</option>
                <option value="Japanese">🇯🇵 Japanese</option>
                <option value="Chinese">🇨🇳 Chinese</option>
                <option value="Korean">🇰🇷 Korean</option>
                <option value="Italian">🇮🇹 Italian</option>
                <option value="Portuguese">🇵🇹 Portuguese</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent" />
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered textarea-primary w-full h-24 focus:shadow-lg transition-all duration-300"
              placeholder="Tell others what this group is about..."
              value={groupData.description}
                 onChange={(e) =>
                setGroupData({ ...groupData, description: e.target.value })
              }
            />
          </div>

          {/* Selected Members Display */}
          {selectedFriends.length > 0 && (
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
              <h4 className="font-semibold text-primary mb-4 flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Selected Members ({selectedFriends.length})
              </h4>
              <div className="flex flex-wrap gap-3">
                {selectedFriends.map((friend) => (
                  <div
                    key={friend._id}
                    className="badge badge-primary badge-lg gap-2 p-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="avatar">
                      <div className="w-6 rounded-full">
                        <img src={friend.profilePic} alt={friend.fullName} />
                      </div>
                    </div>
                    <span>{friend.fullName}</span>
                    <button
                      type="button"
                      onClick={() => toggleFriendSelection(friend)}
                      className="btn btn-ghost btn-xs btn-circle hover:btn-error transition-all duration-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Members Section */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-secondary" />
                Add Members
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search friends to add..."
                className="input input-bordered input-primary w-full pl-10 focus:shadow-lg transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/50" />
            </div>
            
            <div className="mt-4 max-h-80 overflow-y-auto bg-gradient-to-br from-base-100 to-base-200/50 rounded-2xl border border-base-300/50 shadow-inner">
              {filteredUsers.length > 0 ? (
                <div className="p-4 space-y-3">
                  {filteredUsers.map((user, index) => (
                    <div
                      key={user._id}
                      className={`group/user card bg-base-100 hover:bg-base-200/50 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 animate-fade-in ${
                        selectedFriends.some((f) => f._id === user._id)
                          ? "ring-2 ring-primary/50 bg-primary/5"
                          : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => toggleFriendSelection(user)}
                    >
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="avatar">
                                <div className="w-12 rounded-full ring-2 ring-primary/20 group-hover/user:ring-primary/40 transition-all duration-300">
                                  <img src={user.profilePic} alt={user.fullName} />
                                </div>
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-100 animate-pulse"></div>
                            </div>
                            
                            <div className="space-y-1">
                              <p className="font-bold text-primary group-hover/user:text-secondary transition-colors duration-300">
                                {user.fullName}
                              </p>
                              <p className="text-sm text-base-content/70 flex items-center gap-1">
                                <Languages className="h-3 w-3" />
                                {user.nativeLanguage} → {user.learningLanguage}
                              </p>
                            </div>
                          </div>
                          
                          {selectedFriends.some((f) => f._id === user._id) ? (
                            <div className="badge badge-primary badge-lg gap-2 shadow-lg">
                              <UserPlus className="h-4 w-4" />
                              Added
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-primary btn-outline btn-sm gap-2 hover:btn-primary hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFriendSelection(user);
                              }}
                            >
                              <UserPlus className="h-4 w-4" />
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-base-300/50 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-base-content/30" />
                  </div>
                  <p className="text-base-content/50 font-medium">
                    {searchQuery ? "No friends found matching your search" : "No friends available"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action pt-8 border-t border-primary/20">
            <div className="flex gap-4 w-full justify-end">
              <button
                type="button"
                className="btn btn-outline btn-lg hover:btn-error transition-all duration-300"
                onClick={onClose}
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary btn-lg gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ${
                  isPending ? "loading" : ""
                }`}
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Create Group
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;