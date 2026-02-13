import api from "./axios";

export const getOverviewStats = () => {
  return api.get("/api/analytics/overview");
};

export const getConversionStats = () => {
  return api.get("/api/analytics/conversion");
};

export const getOutcomeStats = () => {
  return api.get("/api/analytics/outcomes");
};
