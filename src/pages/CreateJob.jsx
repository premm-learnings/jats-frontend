import { useState } from "react";
import { createJob } from "../api/jobApi";
import { useNavigate } from "react-router-dom";

/*
  CreateJob Page:
  ---------------
  Matches backend CreateJobRequest DTO exactly.
*/
export default function CreateJob() {

  // Required fields
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("SAVED");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Optional / additional fields
  const [location, setLocation] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [ctc, setCtc] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [resumeVersion, setResumeVersion] = useState("");

  const handleCreateJob = async () => {
    setLoading(true);
    setError("");

    try {
      const payload = {
        company,
        role,
        location,
        jobLink,
        ctc,
        appliedDate,
        status,
        resumeVersion,
      };

      await createJob(payload);

      // ✅ If we reached here, job was created
      navigate("/jobs");

    } catch (err) {
      console.error("Create job failed", err);
      setError("Failed to create job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Add New Application
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track a new job opportunity in your pipeline.
          </p>
        </div>

        <div className="bg-white shadow sm:rounded-lg border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-md flex items-start">
                <svg className="h-5 w-5 text-red-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
              
              {/* Company */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Role */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Location */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Hyderabad, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Job Link */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Job Link
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* CTC */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  CTC / Salary
                </label>
                <input
                  type="text"
                  placeholder="e.g. 11 LPA"
                  value={ctc}
                  onChange={(e) => setCtc(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Applied Date */}
              <div className="sm:col-span-1">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date Applied
                </label>
                <input
                  type="date"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Resume Version */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Resume Version
                </label>
                <input
                  type="text"
                  placeholder="e.g. FullStack_v2.pdf"
                  value={resumeVersion}
                  onChange={(e) => setResumeVersion(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                />
              </div>

              {/* Status */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Initial Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                >
                  <option value="SAVED">Saved</option>
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => navigate("/jobs")}
                className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateJob}
                disabled={loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : "Create Job"}
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}