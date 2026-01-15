import axios from "axios";

// API CONSTANTS
const BASE_URL = "http://localhost:8000/api/v1";
const REQUEST = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ATTACH TOKEN
REQUEST.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessItem");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default REQUEST;
