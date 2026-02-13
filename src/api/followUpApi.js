import api from "./axios";

export const createFollowUp = (jobId, data) => {
  return api.post(`/api/jobs/${jobId}/followup`, data);
};

export const getFollowUpsByJob = (jobId) => {
  return api.get(`/api/jobs/${jobId}/followup`);
};

export const completeFollowUp = (jobId) => {
  return api.put(`/api/jobs/${jobId}/followup/complete`);
};

export const getOverdueFollowUps = () => {
  return api.get("/api/jobs/followups/overdue");
};
