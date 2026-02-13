import axios from "axios";

/*
  Axios instance:
  ---------------
  This is the ONLY place where backend base URL is defined.
*/
const api = axios.create({
  baseURL: "http://localhost:8080", // ✅ REAL URL, NOT {baseurl}
  headers: {
    "Content-Type": "application/json",
  },
});

/*
  Attach JWT ONLY for protected endpoints
*/
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
