import api from "./axios";

/*
  Fetch all job applications of logged-in user
*/
export const getMyJobs = () => {
  return api.get("/api/jobs");
};
/*
  Create a new job application
*/
export const createJob = (jobData) => {
  return api.post("/api/jobs", jobData, {
    // ✅ Treat all 2xx responses as success
    validateStatus: (status) => status >= 200 && status < 300,
  });
};
/*
  Update job application status
*/
export const updateJobStatus = (jobId, status) => {
  return api.put(`/api/jobs/${jobId}/status`, {
    status,
  });
};
/*
  Fetch status history for a job
*/
/*
  Fetch status history of a job
*/
export const getStatusHistory = (jobId) => {
  return api.get(`/api/jobs/${jobId}/history`);
};

export const deleteJob = (jobId) => {
  return api.delete(`/api/jobs/${jobId}`);
};



