import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ✅ Import Components
import JobCard from "../components/JobCard";
import JobDetailsModal from "../components/JobDetailsModal"; 

// ✅ Import APIs
import {
  getMyJobs,
  updateJobStatus,
  getStatusHistory,
  deleteJob,
} from "../api/jobApi";

import {
  createFollowUp,
  getFollowUpsByJob,
  completeFollowUp,
} from "../api/followUpApi";

const STATUSES = [
  "SAVED",
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "REJECTED",
];

export default function Jobs() {

  // ================= STATES =================

  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [history, setHistory] = useState([]);

  // ✅ Modal State
  const [viewJob, setViewJob] = useState(null);

  // Follow-up States
  const [followUpJobId, setFollowUpJobId] = useState(null);
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpNote, setFollowUpNote] = useState("");
  const [followUps, setFollowUps] = useState([]);

  // UI Feedback States
  const [followUpSuccess, setFollowUpSuccess] = useState(null);
  const [followUpError, setFollowUpError] = useState(null);

  // ================= LOAD JOBS =================

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getMyJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  // ================= STATUS CHANGE =================

  const handleStatusChange = async (jobId, status) => {
    try {
      await updateJobStatus(jobId, status);
      fetchJobs();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // ================= STATUS HISTORY =================

  const handleViewHistory = async (jobId) => {
    try {
      const response = await getStatusHistory(jobId);
      setSelectedJobId(jobId);
      setHistory(response.data);

      // Scroll to history section
      setTimeout(() => {
        document
          .getElementById("status-history")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);

    } catch (error) {
      console.error("Failed to fetch status history", error);
    }
  };

  // ================= FOLLOWUPS =================

  const loadFollowUps = async (jobId) => {
    try {
      const response = await getFollowUpsByJob(jobId);
      if (response.data) {
        setFollowUps([response.data]);
      } else {
        setFollowUps([]);
      }
    } catch (error) {
      console.error("Failed to load follow-ups", error);
      setFollowUps([]);
    }
  };

  const handleSaveFollowUp = async () => {
    setFollowUpSuccess(null);
    setFollowUpError(null);

    if (!followUpDate || !followUpNote) {
      setFollowUpError("Please fill in both date and note.");
      return;
    }

    try {
      await createFollowUp(followUpJobId, {
        followUpDate: followUpDate,
        note: followUpNote,
      });

      await loadFollowUps(followUpJobId);

      setFollowUpDate("");
      setFollowUpNote("");

      setFollowUpSuccess("Follow-up saved successfully.");
      setTimeout(() => setFollowUpSuccess(null), 3000);

    } catch (error) {
      console.error("Failed to save follow-up", error);
      setFollowUpError("Failed to save follow-up. Please try again.");
    }
  };

  const handleCompleteFollowUp = async () => {
    try {
      await completeFollowUp(followUpJobId);
      await loadFollowUps(followUpJobId);
    } catch (error) {
      console.error("Failed to complete follow-up", error);
    }
  };

  // ================= HELPERS =================

  const jobsByStatus = (status) =>
    jobs.filter((job) => job.status === status);

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Job Applications
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and track your application pipeline
          </p>
        </div>
        
        <Link
          to="/jobs/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </Link>
      </div>

      {/* ========== KANBAN BOARD ========== */}
      <div className="max-w-7xl mx-auto overflow-x-auto pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 min-w-[1000px] lg:min-w-0">
          
          {STATUSES.map((status) => (
            <div key={status} className="flex flex-col h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {status}
                </h3>
                <span className="bg-slate-200 text-slate-600 py-0.5 px-2 rounded-full text-xs font-medium">
                  {jobsByStatus(status).length}
                </span>
              </div>

              {/* Column Body */}
              <div className="bg-slate-100 rounded-xl p-3 border border-slate-200 flex-1 min-h-[150px] shadow-inner space-y-3">
                {jobsByStatus(status).length === 0 && (
                   <div className="h-full flex items-center justify-center text-slate-400 text-sm italic py-8">
                     No jobs
                   </div>
                )}
                
                {jobsByStatus(status).map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onAction={(id, action) => {
                      if (action === "VIEW_DETAILS") {
                        const jobToView = jobs.find((j) => j.id === id);
                        setViewJob(jobToView);
                      }
                      else if (action === "VIEW_HISTORY") {
                        handleViewHistory(id);
                      }
                      else if (action === "ADD_FOLLOWUP") {
                        setFollowUpJobId(id);
                        loadFollowUps(id);
                      }
                      else if (action === "DELETE") {
                        if(window.confirm("Are you sure you want to delete this job?")) {
                           deleteJob(id);
                           fetchJobs();
                        }
                      }
                      else {
                        handleStatusChange(id, action);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== DETAILS SECTION (History & Followups) ========== */}
      <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ========== STATUS HISTORY ========== */}
        {selectedJobId && (
          <div
            id="status-history"
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-lg font-medium text-slate-900">
                Status History
              </h3>
              <button onClick={() => setSelectedJobId(null)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {history.length === 0 ? (
                <p className="text-sm text-slate-500 italic">
                  No history available for this job.
                </p>
              ) : (
                <div className="flow-root">
                  <ul className="-mb-8">
                    {history.map((h, index) => (
                      <li key={index}>
                        <div className="relative pb-8">
                          {index !== history.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                                <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-slate-600">
                                  Moved from <span className="font-medium text-slate-900">{h.oldStatus}</span> to <span className="font-medium text-slate-900">{h.newStatus}</span>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-slate-500">
                                <time>{formatDate(h.changedAt)}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========== FOLLOWUP SECTION ========== */}
        {(followUpJobId || followUps.length > 0) && (
          <div className="space-y-6">
            
            {/* Follow-up Form */}
            {followUpJobId && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-900">
                    Add Follow-up
                  </h3>
                   <button onClick={() => setFollowUpJobId(null)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>
                
                <div className="p-6">
                  {followUpSuccess && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center">
                       ✅ {followUpSuccess}
                    </div>
                  )}
                  {followUpError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm flex items-center">
                       ⚠️ {followUpError}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={followUpDate}
                        onChange={(e) => setFollowUpDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Note</label>
                      <textarea
                        placeholder="Discussed role requirements..."
                        rows="3"
                        value={followUpNote}
                        onChange={(e) => setFollowUpNote(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      onClick={handleSaveFollowUp}
                      className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium text-sm shadow-sm"
                    >
                      Save Follow-up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Follow-up List */}
            {followUps.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                  <h4 className="text-lg font-medium text-slate-900">
                    Reminders
                  </h4>
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {followUps.length}
                  </span>
                </div>
                
                <ul className="divide-y divide-slate-100">
                  {followUps.map((f) => (
                    <li
                      key={f.id}
                      className="p-6 hover:bg-slate-50 transition duration-150 ease-in-out"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-slate-500 mb-1">
                            {formatDate(f.followUpDate)}
                          </div>
                          <p className="text-sm text-slate-800 font-medium">
                            {f.note}
                          </p>
                        </div>

                        {!f.completed ? (
                          <button
                            onClick={handleCompleteFollowUp}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Mark Complete
                          </button>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Completed
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========== JOB DETAILS MODAL ========== */}
      {viewJob && (
        <JobDetailsModal 
          job={viewJob} 
          onClose={() => setViewJob(null)} 
        />
      )}

    </div>
  );
}