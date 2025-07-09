import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";
import { completeOnboarding } from "../lib/api";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Onboarding completed successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const generateRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // Generate number between 1-100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState(prev => ({
      ...prev,
      profilePic: randomAvatar
    }));
  };
  const languages = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese", 
    "Chinese", "Japanese", "Korean", "Arabic", "Russian", "Dutch"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Added Talk-Mate logo in top-left corner */}
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <div className="relative">
            <Phone className="size-8 text-purple-700 drop-shadow-[0_0_10px_rgba(147,51,234,0.7)] animate-pulse" />
            <div className="absolute inset-0 size-8 bg-purple-500/20 rounded-full blur-md animate-pulse" />
          </div>
          <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-pink-400 to-violet-400 tracking-wider drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
            <Link to="/" className="hover:underline">
            Talk-Mate
            </Link>
          </span>
        </div>

        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-pulse mt-14">
              Welcome to Yourself
            </h1>
            <p className="text-xl text-gray-300 font-light">
              Complete your profile to begin your journey
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-pink-500/30 shadow-2xl shadow-pink-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
             <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center mb-4 ring-4 ring-pink-500/50 animate-pulse">
            {formState.profilePic ? (
              <img 
                src={formState.profilePic} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-2xl text-white">👤</span>
            )}
          </div>
          <button 
            type="button"
            onClick={generateRandomAvatar}
            className="absolute -bottom-2 -right-2 bg-cyan-500 hover:bg-cyan-400 text-white p-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-cyan-400/50"
          >
            📷
          </button>
        </div>
      </div>


              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-pink-300 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formState.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-pink-300 text-sm font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formState.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your location"
                  />
                </div>

                {/* Native Language */}
                <div className="space-y-2">
                  <label className="block text-pink-300 text-sm font-medium">
                    Native Language
                  </label>
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select your native language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang} className="bg-black">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Learning Language */}
                <div className="space-y-2">
                  <label className="block text-pink-300 text-sm font-medium">
                    Learning Language
                  </label>
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select language to learn</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang} className="bg-black">
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <label className="block text-pink-300 text-sm font-medium">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formState.bio}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">  
                <button type="submit" disabled={isPending}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 hover:from-pink-600 hover:via-purple-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Complete Onboarding"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Ready to explore the digital frontier? 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
