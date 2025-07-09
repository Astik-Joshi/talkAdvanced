import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, XIcon } from "lucide-react";

const MSidebar = ({ isOpen, onClose }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside className={`fixed top-0 left-0 z-50 w-64 h-full bg-base-200/95 backdrop-blur-lg border-r border-primary/20 shadow-2xl shadow-primary/10 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm hover:btn-error transition-all duration-300"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        
        {/* Mobile Sidebar Content */}
        <div className="flex flex-col h-full pt-16">
          {/* Navigation Section */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/"
              className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
                currentPath === "/" 
                  ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
                  : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
              }`}
              onClick={onClose}
            >
              <HomeIcon className={`size-5 transition-all duration-300 ${
                currentPath === "/" 
                  ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                  : "text-base-content/70 group-hover:text-primary"
              }`} />
              <span>Home</span>
            </Link>

            <Link
              to="/groups"
              className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
                currentPath === "/groups" 
                  ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
                  : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
              }`}
              onClick={onClose}
            >
              <UsersIcon className={`size-5 transition-all duration-300 ${
                currentPath === "/groups" 
                  ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                  : "text-base-content/70 group-hover:text-primary"
              }`} />
              <span>Groups</span>
            </Link>

            <Link
              to="/notifications"
              className={`btn justify-start w-full gap-3 px-3 normal-case group relative overflow-hidden transition-all duration-300 ${
                currentPath === "/notifications" 
                  ? "bg-primary hover:bg-primary/90 border-primary shadow-lg shadow-primary/25 text-white" 
                  : "btn-ghost hover:btn-outline hover:btn-primary hover:shadow-md hover:shadow-primary/20"
              }`}
              onClick={onClose}
            >
              <BellIcon className={`size-5 transition-all duration-300 ${
                currentPath === "/notifications" 
                  ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
                  : "text-base-content/70 group-hover:text-primary"
              }`} />
              <span>Notifications</span>
            </Link>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
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
        </div>
      </aside>
    </>
  );
};

export default MSidebar;