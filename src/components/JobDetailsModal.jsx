import React from "react";

export default function JobDetailsModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">
            {job.company}
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</label>
              <p className="text-slate-900 font-medium">{job.role}</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
              <span className={`inline-block mt-1 px-2 py-1 text-xs font-bold rounded 
                ${job.status === 'OFFER' ? 'bg-green-100 text-green-800' : 
                  job.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 
                  'bg-blue-100 text-blue-800'}`}>
                {job.status}
              </span>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</label>
            <p className="text-slate-900">{job.location || "Not specified"}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CTC / Salary</label>
            <p className="text-slate-900">{job.ctc || "Not specified"}</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applied Date</label>
            <p className="text-slate-900">
              {job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "N/A"}
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume Version</label>
            <p className="text-slate-700 italic">{job.resumeVersion || "Default"}</p>
          </div>

          {/* Job Link */}
          {job.jobLink && (
            <div className="pt-2">
              <a 
                href={job.jobLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-2 rounded-md transition-colors font-medium text-sm border border-indigo-200"
              >
                Visit Job Posting
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 text-right">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}