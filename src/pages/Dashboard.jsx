import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOverdueFollowUps } from "../api/followUpApi";
import { getMyJobs } from "../api/jobApi"; 

export default function Dashboard() {
  const [overdueCount, setOverdueCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load Data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Parallel Fetch
      const [overdueRes, jobsRes] = await Promise.all([
        getOverdueFollowUps(),
        getMyJobs()
      ]);

      setOverdueCount(overdueRes.data.length);
      setJobs(jobsRes.data);
    } catch (error) {
      console.error("Dashboard load failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Process Data for UI
  const upcomingInterviews = jobs.filter(j => j.status === 'INTERVIEW');
  const offers = jobs.filter(j => j.status === 'OFFER');
  
  // Get recent 5 jobs (Assuming larger ID = newer)
  const recentJobs = [...jobs].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-slate-900">
            Welcome back!
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Here is what's happening with your job search today.
          </p>
        </div>
        <Link
          to="/jobs/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 shadow-sm transition-colors"
        >
          + Add New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        
        {/* Total Applications */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Jobs</p>
              <p className="text-2xl font-bold text-slate-900">{jobs.length}</p>
            </div>
          </div>
        </div>

        {/* Interviews */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-amber-100 rounded-lg text-amber-600">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Interviews</p>
              <p className="text-2xl font-bold text-slate-900">{upcomingInterviews.length}</p>
            </div>
          </div>
        </div>

        {/* Offers */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Offers</p>
              <p className="text-2xl font-bold text-slate-900">{offers.length}</p>
            </div>
          </div>
        </div>

        {/* ✅ Overdue (Action Items) - With View Details Link */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5 flex flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Action Items</p>
              <p className="text-2xl font-bold text-slate-900">{overdueCount}</p>
            </div>
          </div>
          
          {/* ✅ Restored Link */}
          <div className="mt-4 pt-3 border-t border-slate-100">
             <Link 
               to="/followups/overdue" 
               className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wide flex items-center"
             >
               View Details <span className="ml-1 text-sm">→</span>
             </Link>
          </div>
        </div>

      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Upcoming Interviews */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-800">Upcoming Interviews</h3>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {upcomingInterviews.length}
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {upcomingInterviews.length === 0 ? (
               <div className="p-8 text-center text-slate-500 text-sm">
                 No active interviews at the moment.
               </div>
            ) : (
              upcomingInterviews.map(job => (
                <div key={job.id} className="p-4 hover:bg-slate-50 transition-colors flex justify-between items-center">
                   <div>
                     <p className="font-bold text-slate-800">{job.company}</p>
                     <p className="text-sm text-slate-500">{job.role}</p>
                   </div>
                   <Link to="/jobs" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                     View
                   </Link>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-100">
             {recentJobs.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">
                  Start by adding your first job!
                </div>
             ) : (
                recentJobs.map(job => (
                  <div key={job.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div>
                       <p className="font-bold text-slate-800">{job.company}</p>
                       <p className="text-xs text-slate-400">Added: {job.appliedDate || "Recently"}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide
                      ${job.status === 'OFFER' ? 'bg-emerald-100 text-emerald-700' : 
                        job.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                        job.status === 'INTERVIEW' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'}`}>
                      {job.status}
                    </span>
                  </div>
                ))
             )}
          </div>
           <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 text-center">
             <Link to="/jobs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
               View All Applications &rarr;
             </Link>
           </div>
        </div>

      </div>
    </div>
  );
}