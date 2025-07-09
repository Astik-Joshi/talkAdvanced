import { useState } from "react";
import { Phone, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignup";
import toast from "react-hot-toast";
const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
    if(signupData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Synthwave background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(147,51,234,0.05)_49%,rgba(147,51,234,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500">
        {/* Purple glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-violet-500/10 rounded-2xl blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-violet-500/5 rounded-2xl"></div>
        
        {/* Left side form */}
        <div className="relative z-10 w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col">
          {/* Logo and header */}
          <div className="mb-8 flex items-center justify-start gap-3">
            <div className="relative">
              <Phone className="size-10 text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
              <div className="absolute inset-0 size-10 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-3xl lg:text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 tracking-wider drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]">
              Talk-mate
            </span>
          </div>

          {/* Error message display */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <span className="text-red-400 text-sm">
                {error.response?.data?.message || "Something went wrong"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Create an Account
                </h2>
                <p className="text-gray-300 text-sm lg:text-base">
                  Join Talk-Mate and start your language learning adventure!
                </p>
              </div>

              <div className="space-y-5">
                {/* Full Name Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-purple-300 font-medium">Full Name</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input w-full bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:bg-gray-800/70 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({ ...signupData, fullName: e.target.value })
                      }
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Email Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-purple-300 font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="yourName@gmail.com"
                      className="input w-full bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:bg-gray-800/70 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({ ...signupData, email: e.target.value })
                      }
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Password Input with toggle */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-purple-300 font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="input w-full bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:bg-gray-800/70 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)] pr-10"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({ ...signupData, password: e.target.value })
                      }
                      required
                      minLength={6}
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-300 focus:outline-none transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Password must be at least 6 characters long
                  </p>
                </div>

                {/* Terms checkbox */}
                <div className="form-control">
                  <label className="label cursor-pointer justify-start gap-3">
                    <input 
                      type="checkbox" 
                      className="checkbox checkbox-sm border-purple-500/50 checked:bg-purple-500 checked:border-purple-500" 
                      required 
                    />
                    <span className="text-xs lg:text-sm leading-tight text-gray-300">
                      I agree to the{" "}
                      <Link to="/terms" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
                        privacy policy
                      </Link>
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <button 
                className="btn w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-none text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>

              {/* Login link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-300">
                  Already have an account?{" "}
                  <Link 
                    to="/login" 
                    className="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-purple-900/30 to-violet-900/30 items-center justify-center relative overflow-hidden">
          {/* Background effects for right side */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_48%,rgba(147,51,234,0.05)_49%,rgba(147,51,234,0.05)_51%,transparent_52%)] bg-[length:30px_30px]"></div>
          
          <div className="relative z-10 max-w-md p-8 text-center">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-2xl animate-pulse"></div>
              <img 
                src="/i.png" 
                alt="Language connection illustration" 
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]" 
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Connect with language partners worldwide
              </h2>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;