export default function JobCard({ job, onAction }) {
  return (
    <div className="group relative bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col gap-3">
      
      {/* Header */}
      <div>
        <h4 className="text-base font-bold text-slate-800 leading-tight truncate">
          {job.company}
        </h4>
        <p className="text-sm text-slate-500 font-medium mt-0.5 truncate">
          {job.role}
        </p>
      </div>

      {/* Status Chips */}
      <div className="flex flex-wrap gap-2">
        {job.status !== "APPLIED" && (
          <button onClick={() => onAction(job.id, "APPLIED")} className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 transition-colors">Applied</button>
        )}
        {job.status !== "INTERVIEW" && (
          <button onClick={() => onAction(job.id, "INTERVIEW")} className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-100 transition-colors">Interview</button>
        )}
        {job.status !== "OFFER" && (
          <button onClick={() => onAction(job.id, "OFFER")} className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 transition-colors">Offer</button>
        )}
        {job.status !== "REJECTED" && (
          <button onClick={() => onAction(job.id, "REJECTED")} className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100 transition-colors">Rejected</button>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
        
        <div className="flex space-x-2">
          
          {/* ✅ View Details Button */}
          <button
            onClick={() => onAction(job.id, "VIEW_DETAILS")}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View Full Details"
          >
             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
             </svg>
          </button>

          {/* History Button */}
          <button
            onClick={() => onAction(job.id, "VIEW_HISTORY")}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
            title="View Status History"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Add Follow-up Button */}
          <button
            onClick={() => onAction(job.id, "ADD_FOLLOWUP")}
            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
            title="Add Follow-up / Reminder"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onAction(job.id, "DELETE")}
          className="p-1.5 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          title="Delete Application"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>

      </div>
    </div>
  );
}