import axios from "axios";

// API CONSTANTS
const BASE_URL = "https://e-commerce-tlt-server.onrender.com/api/v1/";
const REQUEST = axios.create({
  url: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export { REQUEST };
