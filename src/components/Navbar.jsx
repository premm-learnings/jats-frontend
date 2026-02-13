import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-1.5 rounded-md">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                JATS
              </h1>
            </Link>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            <div className="hidden md:flex space-x-1">
              <Link 
                to="/dashboard" 
                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Dashboard
              </Link>
              <Link 
                to="/jobs" 
                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Jobs
              </Link>
              <Link 
                to="/analytics" 
                className="text-slate-300 hover:bg-slate-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
              >
                Analytics
              </Link>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 border border-transparent hover:border-red-500"
            >
              <span>Logout</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>

        </div>
      </div>
      
      {/* Mobile Links (Visible only on small screens) */}
      <div className="md:hidden border-t border-slate-800 bg-slate-900 pb-2">
        <div className="px-2 pt-2 space-y-1 flex justify-around">
           <Link to="/dashboard" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium hover:text-white">Dashboard</Link>
           <Link to="/jobs" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium hover:text-white">Jobs</Link>
           <Link to="/analytics" className="text-slate-300 block px-3 py-2 rounded-md text-base font-medium hover:text-white">Analytics</Link>
        </div>
      </div>
    </nav>
  );
}