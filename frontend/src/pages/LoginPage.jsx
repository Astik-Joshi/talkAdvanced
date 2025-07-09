import { useState } from "react";
import { Phone, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ use custom login mutation
 const { isPending, error, loginMutation } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Synthwave background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(147,51,234,0.05)_49%,rgba(147,51,234,0.05)_51%,transparent_52%)] bg-[length:20px_20px]"></div>
      
      {/* Animated glow orbs */}
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row w-full max-w-6xl mx-auto bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30 hover:border-purple-500/50 transition-all duration-500">
        {/* Purple glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-violet-500/10 rounded-2xl blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-violet-500/5 rounded-2xl"></div>
        
        {/* LOGIN FORM - LEFT SIDE */}
        <div className="relative z-10 w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* LOGO */}
          <div className="mb-8 flex items-center justify-start gap-3">
            <div className="relative">
              <Phone className="size-10 text-purple-400 drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
              <div className="absolute inset-0 size-10 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
            </div>
            <span className="text-3xl lg:text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 tracking-wider drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]">
     Talk-Mate
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
              <span className="text-red-400 text-sm">
                {error.response?.data?.message || "Something went wrong"}
              </span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Welcome Back
                </h2>
                <p className="text-gray-300 text-sm lg:text-base">
            Chat with you friends,Talk-Mate
                </p>
              </div>

              <div className="space-y-5">
                {/* EMAIL */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-purple-300 font-medium">Email</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="john@gmail.com"
                      className="input w-full bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:bg-gray-800/70 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-purple-300 font-medium">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      className="input w-full pr-12 bg-gray-800/50 border-purple-500/30 focus:border-purple-400 focus:bg-gray-800/70 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="size-5" />
                      ) : (
                        <EyeIcon className="size-5" />
                      )}
                    </button>
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/10 to-violet-500/10 blur-sm opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* REMEMBER ME & FORGOT PASSWORD */}
                <div className="flex items-center justify-between">
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3 p-0">
                      <input 
                        type="checkbox" 
                        className="checkbox checkbox-sm border-purple-500/50 checked:bg-purple-500 checked:border-purple-500" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="text-sm text-gray-300">
                        Remember me
                      </span>
                    </label>
                  </div>
                  
            
                </div>
              </div>

              <button 
                className="btn w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border-none text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-300">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>

              {/* SOCIAL LOGIN DIVIDER */}

   
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - WELCOME BACK */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-purple-900/30 to-violet-900/30 items-center justify-center relative overflow-hidden">
          {/* Background effects for right side */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.1),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(225deg,transparent_48%,rgba(147,51,234,0.05)_49%,rgba(147,51,234,0.05)_51%,transparent_52%)] bg-[length:30px_30px]"></div>
          
          <div className="relative z-10 max-w-md p-8 text-center">
            {/* Welcome back illustration */}
            <div className="relative aspect-square max-w-sm mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                {/* Synthwave grid */}
                <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,rgba(147,51,234,0.3)_50%,transparent_51%)] bg-[length:100%_10px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(147,51,234,0.3)_50%,transparent_51%)] bg-[length:10px_100%]"></div>
                
                {/* Central glow */}
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute w-20 h-20 bg-gradient-to-r from-purple-400/50 to-violet-400/50 rounded-full blur-lg animate-pulse delay-500"></div>
                <div className="absolute w-12 h-12 bg-gradient-to-r from-purple-300/70 to-violet-300/70 rounded-full blur-md animate-pulse delay-1000"></div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Welcome Back to the Future
              </h2>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                Your language learning adventure continues. Connect with speakers worldwide and master new languages in our cyberpunk-inspired platform.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">50K+</div>
                  <div className="text-xs text-gray-400">Learners</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-400">100+</div>
                  <div className="text-xs text-gray-400">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">24/7</div>
                  <div className="text-xs text-gray-400">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
