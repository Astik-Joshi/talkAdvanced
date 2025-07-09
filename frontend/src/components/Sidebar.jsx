/* {THIS IS THE CONDITION} ? (THEN RUN THIS) : (OTHERWISE DO THIS HERE) */
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, Phone, ShipWheelIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200/90 backdrop-blur-lg border-r border-primary/20 hidden lg:flex flex-col h-screen sticky top-0 shadow-2xl shadow-primary/10">
      {/* Header Section */}
     {/*  <div className="p-5 border-b border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Phone className="size-9 text-primary group-hover:text-secondary transition-all duration-300 drop-shadow-lg filter drop-shadow-[0_0_8px_theme(colors.primary)]" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-secondary/20 transition-all duration-300"></div>
          </div>
         <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent tracking-wider hover:from-secondary hover:to-primary transition-all duration-300 drop-shadow-lg">
  Talk-Mate
</span>
        </Link>
      </div> */}

      {/* Navigation Section */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
            currentPath === "/" 
              ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
              : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
          }`}
        >
          <HomeIcon className={`size-5 transition-all duration-300 ${
            currentPath === "/" 
              ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
              : "text-base-content/70 group-hover:text-primary"
          }`} />
          <span className={`font-medium transition-all duration-300 ${
            currentPath === "/" 
              ? "text-white font-semibold" 
              : "text-base-content group-hover:text-primary"
          }`}>
            Home
          </span>
          {currentPath === "/" && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 animate-pulse"></div>
          )}
        </Link>
<Link
  to="/groups"
  className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
    currentPath === "/groups" 
      ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
      : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
  }`}
>
  <UsersIcon className={`size-5 transition-all duration-300 ${
    currentPath === "/groups" 
      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
      : "text-base-content/70 group-hover:text-primary"
  }`} />
  <span className={`font-medium transition-all duration-300 ${
    currentPath === "/groups" 
      ? "text-white font-semibold" 
      : "text-base-content group-hover:text-primary"
  }`}>
    Groups
  </span>
</Link>
        <Link
          to="/notifications"
          className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
            currentPath === "/notifications" 
              ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
              : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
          }`}
        >
          <BellIcon className={`size-5 transition-all duration-300 ${
            currentPath === "/notifications" 
              ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
              : "text-base-content/70 group-hover:text-primary"
          }`} />
          <span className={`font-medium transition-all duration-300 ${
            currentPath === "/notifications" 
              ? "text-white font-semibold" 
              : "text-base-content group-hover:text-primary"
          }`}>
            Notifications
          </span>
          {currentPath === "/notifications" && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 animate-pulse"></div>
          )}
        </Link>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-primary/20 mt-auto bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-base-300/50 border border-primary/10 hover:border-primary/30 hover:bg-base-300/70 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
          <div className="relative">
            <div className="avatar">
              <div className="w-10 rounded-full ring-2 ring-primary/50 ring-offset-2 ring-offset-base-200 group-hover:ring-secondary/50 transition-all duration-300">
                <img src={authUser?.profilePic} alt="User Avatar" className="rounded-full" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-200 animate-pulse shadow-lg shadow-success/50"></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-white drop-shadow-lg">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1 font-medium">
              <span className="size-2 rounded-full bg-success inline-block animate-pulse shadow-lg shadow-success/50" />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Neon Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-1 h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-pulse"></div>
        <div className="absolute top-3/4 right-0 w-1 h-24 bg-gradient-to-b from-transparent via-secondary/30 to-transparent animate-pulse"></div>
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      </div>
    </aside>
  );
};

export default Sidebar;
