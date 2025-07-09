// NotificationsPage.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { 
  BellIcon, 
  ClockIcon, 
  MessageSquareIcon, 
  UserCheckIcon,
  CheckCircleIcon,
  SparklesIcon,
  GlobeIcon,
  BookOpenIcon
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200/50 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full mb-6 shadow-2xl shadow-primary/25 border-4 border-base-100">
            <BellIcon className="w-10 h-10 text-primary-content" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4 tracking-tight">
            Notifications
          </h1>
          <p className="text-base-content/70 text-xl max-w-2xl mx-auto leading-relaxed">
            Stay connected with your language learning community
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-32">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-primary animate-pulse" strokeWidth={2} />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Friend Requests Section */}
            {incomingRequests.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-success to-success/80 rounded-xl shadow-lg">
                      <UserCheckIcon className="h-7 w-7 text-success-content" strokeWidth={1.5} />
                    </div>
                    <span className="text-success">Friend Requests</span>
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-success to-success/80 text-success-content text-lg font-bold rounded-full shadow-lg animate-pulse border-2 border-success-content/20">
                      {incomingRequests.length}
                    </span>
                  </h2>
                </div>

                <div className="grid gap-6">
                  {incomingRequests.map((request, index) => (
                    <div
                      key={request._id}
                      className="group relative bg-gradient-to-br from-base-200 to-base-300 hover:from-base-300 hover:to-base-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300/50 overflow-hidden transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animation: 'slideInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-success/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative p-8">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="relative">
                              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 p-1 shadow-xl">
                                <img 
                                  src={request.sender.profilePic} 
                                  alt={request.sender.fullName}
                                  className="w-full h-full rounded-full object-cover border-2 border-base-100"
                                />
                              </div>
                              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-success to-success/80 rounded-full border-3 border-base-100 shadow-lg animate-pulse"></div>
                            </div>
                            
                            <div className="space-y-3">
                              <h3 className="text-2xl font-bold text-base-content group-hover:text-success transition-colors duration-300">
                                {request.sender.fullName}
                              </h3>
                              <div className="flex flex-wrap gap-3">
                                <span className="badge badge-primary badge-lg shadow-lg gap-2 px-4 py-2">
                                  <GlobeIcon className="w-4 h-4" />
                                  Native: {request.sender.nativeLanguage}
                                </span>
                                <span className="badge badge-secondary badge-lg shadow-lg gap-2 px-4 py-2">
                                  <BookOpenIcon className="w-4 h-4" />
                                  Learning: {request.sender.learningLanguage}
                                </span>
                              </div>
                            </div>
                          </div>

                          <button
                            className="btn btn-success btn-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none min-w-[140px]"
                            onClick={() => acceptRequestMutation(request._id)}
                            disabled={isPending}
                          >
                            {isPending ? (
                              <div className="flex items-center gap-3">
                                <span className="loading loading-spinner loading-md"></span>
                                <span className="font-semibold">Accepting...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3">
                                <CheckCircleIcon className="w-6 h-6" strokeWidth={2} />
                                <span className="font-semibold">Accept</span>
                              </div>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted Requests Section */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-3xl font-bold flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-info to-info/80 rounded-xl shadow-lg">
                    <BellIcon className="h-7 w-7 text-info-content" strokeWidth={1.5} />
                  </div>
                  <span className="text-info">New Connections</span>
                </h2>

                <div className="grid gap-6">
                  {acceptedRequests.map((notification, index) => (
                    <div 
                      key={notification._id} 
                      className="group bg-gradient-to-br from-base-200 to-base-300 hover:from-base-300 hover:to-base-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300/50 overflow-hidden transform hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animation: 'slideInUp 0.6s ease-out forwards'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-info/5 via-transparent to-info/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative p-8">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="w-18 h-18 rounded-full bg-gradient-to-br from-info to-info/80 p-1 shadow-xl">
                              <img
                                src={notification.recipient.profilePic}
                                alt={notification.recipient.fullName}
                                className="w-full h-full rounded-full object-cover border-2 border-base-100"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-success to-success/80 rounded-full border-3 border-base-100 shadow-lg flex items-center justify-center">
                              <CheckCircleIcon className="w-4 h-4 text-success-content" strokeWidth={2} />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-base-content group-hover:text-info transition-colors duration-300">
                              {notification.recipient.fullName}
                            </h3>
                            <p className="text-base-content/70 mt-2 text-lg">
                              🎉 {notification.recipient.fullName} accepted your friend request
                            </p>
                            <div className="flex items-center gap-3 mt-4 text-base-content/60">
                              <ClockIcon className="h-5 w-5" strokeWidth={1.5} />
                              <span className="font-medium">Recently</span>
                            </div>
                          </div>
                          
                          <div className="badge badge-success badge-lg gap-3 shadow-lg px-4 py-3">
                            <MessageSquareIcon className="h-5 w-5" strokeWidth={1.5} />
                            <span className="font-semibold">New Friend</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* No Notifications */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </div>
        )}
      </div>
      
      {/* Enhanced CSS animations */}
      <style jsx>{`
        @keyframes slideInUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default NotificationsPage;
