import axios from "axios";

// API CONSTANTS
const BASE_URL = "http://localhost:8000/api/v1";
const REQUEST = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ATTACH TOKEN
REQUEST.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR
// REQUEST.interceptors.response.use(
//   (response) => {
//     // ✅ unwrap ApiResponse automatically
//     if (response?.data?.data !== undefined) {
//       return response.data.data;
//     }

//     // fallback (just in case)
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default REQUEST;
