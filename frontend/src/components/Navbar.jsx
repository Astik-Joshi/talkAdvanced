import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Phone, Sparkles, User, Menu } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import { useState } from "react";
import MSidebar from "./MSidebar"; // Import the mobile sidebar component

const Navbar = ({ showSidebarToggle = true }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const { logoutMutation } = useLogout();

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      <nav className="relative bg-gradient-to-r from-base-200/95 via-base-200/90 to-base-200/95 backdrop-blur-2xl border-b border-primary/30 sticky top-0 z-50 h-20 flex items-center shadow-2xl shadow-primary/10 w-full">
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/3 to-accent/5 animate-gradient-x opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--p),0.1),transparent_70%)]"></div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
          <div className="absolute top-8 right-1/3 w-1 h-1 bg-secondary/40 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-6 left-1/3 w-1.5 h-1.5 bg-accent/30 rounded-full animate-float-slow"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between w-full">
            {/* Hamburger Menu (Mobile Only) */}
            {showSidebarToggle && (
              <button
                className="lg:hidden btn btn-ghost btn-circle group relative hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-110"
                onClick={toggleMobileSidebar}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Menu className="h-6 w-6 text-base-content/70 group-hover:text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_12px_theme(colors.primary)] relative z-10" />
              </button>
            )}

            {/* LOGO */}
            <div className={`${showSidebarToggle ? 'lg:pl-5' : 'pl-5'}`}>
              <Link to="/" className="flex items-center gap-5 group relative p-2 rounded-2xl hover:bg-primary/10 transition-all duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-md opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-primary/20 to-secondary/20 p-3 rounded-2xl border border-primary/30 group-hover:border-secondary/50 transition-all duration-500 backdrop-blur-sm">
                    <Phone className="size-3 text-primary group-hover:text-secondary transition-all duration-500 drop-shadow-[0_0_12px_theme(colors.primary)] group-hover:drop-shadow-[0_0_16px_theme(colors.secondary)] group-hover:rotate-12 group-hover:scale-110" />
                    <Sparkles className="absolute -top-1 -right-1 size-4 text-accent animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider group-hover:from-secondary group-hover:via-accent group-hover:to-primary transition-all duration-500 drop-shadow-lg">
                    Talk-Mate
                  </span>
                  
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              {/* Notifications Button */}
              <Link to={"/notifications"}>
                <button className="btn btn-ghost btn-circle group relative hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <BellIcon className="h-6 w-6 text-base-content/70 group-hover:text-primary transition-all duration-300 group-hover:drop-shadow-[0_0_12px_theme(colors.primary)] relative z-10" />
                </button>
              </Link>

              {/* Theme Selector */}
              <div className="relative z-[100]">
                <div className="p-1 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm">
                  <ThemeSelector />
                </div>
              </div>

              {/* User Avatar */}
              <div className="avatar group relative">
                <div className="w-12 h-12 rounded-2xl ring-2 ring-primary/30 ring-offset-2 ring-offset-base-200 group-hover:ring-secondary/50 group-hover:ring-4 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 relative">
                  <img 
                    src={authUser?.profilePic} 
                    alt="User Avatar" 
                    rel="noreferrer" 
                    className="rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-success to-info rounded-full border-2 border-base-200 shadow-lg shadow-success/50 relative">
                  <div className="absolute inset-0 bg-success rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-success rounded-full"></div>
                </div>

                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-base-300/95 backdrop-blur-sm px-3 py-2 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none border border-primary/20 shadow-xl min-w-max z-[110]">
                  <span className="text-primary">Online</span>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-base-300 rotate-45 border-l border-t border-primary/20"></div>
                </div>
              </div>

              {/* Logout Button */}
              <button 
                className="btn btn-ghost btn-circle group relative hover:bg-error/10 hover:border-error/30 transition-all duration-300 hover:shadow-xl hover:shadow-error/20 hover:scale-110"
                onClick={logoutMutation}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-error/0 via-error/10 to-error/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <LogOutIcon className="h-6 w-6 text-base-content/70 group-hover:text-error transition-all duration-300 group-hover:drop-shadow-[0_0_12px_theme(colors.error)] relative z-10 group-hover:rotate-12" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-pulse"></div>
        </div>
        
        {/* Multiple Glow Effects */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/4 w-40 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse delay-2000"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-1/2 left-8 w-16 h-16 bg-primary/5 rounded-full blur-xl animate-float opacity-50"></div>
        <div className="absolute top-1/3 right-12 w-12 h-12 bg-secondary/5 rounded-full blur-xl animate-float-delayed opacity-40"></div>
      </nav>

      {/* Mobile Sidebar */}
      <MSidebar 
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;