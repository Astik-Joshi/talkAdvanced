import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { 
  CheckCircleIcon, 
  MapPinIcon, 
  UserPlusIcon, 
  UsersIcon,
  SparklesIcon,
  HeartIcon,
  GlobeIcon
} from "lucide-react";
import '../index.css'

import { capitialize } from "../lib/utils";

import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      {/* Hero Section with theme-aware gradients */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto space-y-10">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                  Your Friends
                </h1>
                <p className="text-base-content/70 text-lg flex items-center gap-2">
                  <GlobeIcon className="size-5 text-secondary" />
                  Connect with amazing language learners worldwide
                </p>
              </div>
              <Link 
                to="/notifications" 
                className="btn btn-outline btn-lg group hover:btn-primary transition-all duration-300 shadow-lg hover:shadow-xl border-primary/20 hover:border-primary"
              >
                <UsersIcon className="mr-2 size-5 group-hover:scale-110 transition-transform" />
                Friend Requests
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-error rounded-full animate-pulse"></div>
              </Link>
            </div>

            {/* Friends Section */}
            <div className="relative">
              {loadingFriends ? (
                <div className="flex justify-center py-20">
                  <div className="relative">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <div className="absolute inset-0 loading loading-spinner loading-lg text-secondary opacity-50 animate-pulse"></div>
                  </div>
                </div>
              ) : friends.length === 0 ? (
                <div className="transform transition-all duration-500 hover:scale-105">
                  <NoFriendsFound />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {friends.map((friend, index) => (
                    <div 
                      key={friend._id}
                      className="transform transition-all duration-500 hover:scale-105 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <FriendCard friend={friend} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Users Section */}
            <section className="relative">
              {/* Background decoration */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
              
              <div className="relative mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <SparklesIcon className="size-8 text-accent animate-pulse" />
                      <h2 className="text-3xl sm:text-4xl font-bold text-primary">
                        Meet New Learners
                      </h2>
                    </div>
                    <p className="text-base-content/70 text-lg flex items-center gap-2">
                      <GlobeIcon className="size-5 text-secondary" />
                      Discover perfect language exchange partners based on your profile
                    </p>
                  </div>
                </div>
              </div>

              {loadingUsers ? (
                <div className="flex justify-center py-20">
                  <div className="relative">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <div className="absolute inset-0 loading loading-spinner loading-lg text-secondary opacity-50 animate-pulse"></div>
                  </div>
                </div>
              ) : recommendedUsers.length === 0 ? (
                <div className="card bg-base-200 hover:bg-base-300 p-8 text-center shadow-xl border border-base-300 hover:border-primary/30 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors duration-300">
                      <HeartIcon className="size-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-base-content">No recommendations available</h3>
                    <p className="text-base-content/70 text-lg">
                      Check back later for new language partners!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {recommendedUsers.map((user, index) => {
                    const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                    return (
                      <div
                        key={user._id}
                        className="group card bg-base-200 hover:bg-base-300 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-base-300 hover:border-primary/30 animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="card-body p-6 space-y-5">
                          {/* User Info */}
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="avatar size-14 rounded-full ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                                <img 
                                  src={user.profilePic} 
                                  alt={user.fullName}
                                  className="rounded-full object-cover"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-base-100 flex items-center justify-center">
                                <div className="w-2 h-2 bg-base-100 rounded-full animate-pulse"></div>
                              </div>
                            </div>

                            <div className="flex-1">
                              <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                                {user.fullName}
                              </h3>
                              {user.location && (
                                <div className="flex items-center text-sm text-base-content/70 mt-1">
                                  <MapPinIcon className="size-4 mr-1 text-error" />
                                  {user.location}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Languages with theme-aware styling */}
                          <div className="flex flex-wrap gap-2">
                            <span className="badge badge-lg badge-secondary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                              <span className="mr-1">{getLanguageFlag(user.nativeLanguage)}</span>
                              Native: {capitialize(user.nativeLanguage)}
                            </span>
                            <span className="badge badge-lg badge-outline badge-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                              <span className="mr-1">{getLanguageFlag(user.learningLanguage)}</span>
                              Learning: {capitialize(user.learningLanguage)}
                            </span>
                          </div>

                          {/* Bio */}
                          {user.bio && (
                            <div className="bg-base-300/50 hover:bg-base-300/70 p-4 rounded-lg transition-colors duration-300 border border-base-300/50">
                              <p className="text-sm text-base-content/80 leading-relaxed italic">
                                "{user.bio}"
                              </p>
                            </div>
                          )}

                          {/* Action button */}
                          <button
                            className={`btn w-full mt-4 text-base font-semibold transition-all duration-300 ${
                              hasRequestBeenSent 
                                ? "btn-success shadow-lg" 
                                : "btn-primary hover:btn-primary-focus shadow-lg hover:shadow-xl transform hover:scale-105"
                            }`}
                            onClick={() => sendRequestMutation(user._id)}
                            disabled={hasRequestBeenSent || isPending}
                          >
                            {hasRequestBeenSent ? (
                              <>
                                <CheckCircleIcon className="size-5 mr-2" />
                                Request Sent
                              </>
                            ) : (
                              <>
                                <UserPlusIcon className="size-5 mr-2 group-hover:scale-110 transition-transform" />
                                Send Friend Request
                              </>
                            )}
                          </button>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <SparklesIcon className="size-6 text-accent animate-pulse" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
/* Add this to your global CSS file */
