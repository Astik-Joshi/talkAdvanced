import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { UserPlus, X, Check } from "lucide-react";
import { addGroupMembers, getRecommendedUsers } from "../lib/api";

const AddMembersModal = ({ group, onClose }) => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  const { data: recommendedUsers = [] } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });
const { mutate, isPending } = useMutation({
  mutationFn: async () => {
    // Extract just the IDs from selectedFriends
    const memberIds = selectedFriends.map(f => f._id);
    
    // Ensure we're sending a properly formatted request
    const response = await addGroupMembers(group._id, { members: memberIds });
    return response;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["group", group._id]); // Invalidate specific group
    queryClient.invalidateQueries(["groups"]); // Invalidate all groups
    toast.success("Members added successfully!");
    onClose();
  },
  onError: (error) => {
    console.error("Add members error:", error);
    toast.error(error.response?.data?.message || "Failed to add members");
  },
});
  const toggleFriendSelection = (friend) => {
    setSelectedFriends((prev) =>
      prev.some((f) => f._id === friend._id)
        ? prev.filter((f) => f._id !== friend._id)
        : [...prev, friend]
    );
  };

  const filteredUsers = recommendedUsers.filter(
    (user) =>
      !group.members.some(member => member._id === user._id) &&
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md bg-base-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-primary">
            Add Members to {group.name}
          </h3>
          <button onClick={onClose} className="btn btn-ghost btn-circle">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search friends..."
              className="input input-bordered w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="max-h-96 overflow-y-auto bg-base-100 rounded-lg p-2 border border-base-300">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                    selectedFriends.some((f) => f._id === user._id)
                      ? "bg-primary/10"
                      : "hover:bg-base-200"
                  }`}
                  onClick={() => toggleFriendSelection(user)}
                >
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user.profilePic} alt={user.fullName} />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{user.fullName}</p>
                      <p className="text-xs text-base-content/70">
                        {user.nativeLanguage} → {user.learningLanguage}
                      </p>
                    </div>
                  </div>
                  {selectedFriends.some((f) => f._id === user._id) ? (
                    <div className="badge badge-primary gap-1">
                      <Check className="h-3 w-3" />
                      Selected
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-xs btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFriendSelection(user);
                      }}
                    >
                      <UserPlus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-base-content/50">
                No available friends to add
              </div>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-primary ${isPending ? "loading" : ""}`}
              onClick={() => mutate()}
              disabled={isPending || selectedFriends.length === 0}
            >
              {isPending ? "Adding..." : "Add Members"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMembersModal;