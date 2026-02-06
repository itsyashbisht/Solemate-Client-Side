import axios from 'axios';

// API CONSTANTS
const BASE_URL = import.meta.env.VITE_API_URL;
const REQUEST = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ATTACH TOKEN
REQUEST.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR - TRANSFORM API RESPONSE
REQUEST.interceptors.response.use(
  (response) => {
    /*
    API RETURNS:
    {
      statusCode: 200,
      data: { _id, username, email, ... },  ← Actual data
      messagae: "Success",
      success: true
    }

    - AXIOS WRAPS IT AS:
    response.data = { statusCode, data: {...}, messagae, success }

    - WE WANT:
    response.data = { _id, username, email, ... }  ← JUST the data
    */

    // SOLUTION: Extract the nested data and make it the response.data
    const apiResponse = response.data;

    // FLATTEN: Make response.data = actual user/resource object
    if (apiResponse?.data) {
      response.data = apiResponse.data;
    }

    return response;
  },
  (error) => {
    // ERROR HANDLING
    console.error('API Error:', error.message);

    // AUTO-LOGOUT ON 401
    if (error.response?.status === 401) {
      console.log('❌ Unauthorized - logging out');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      console.error('❌ Forbidden access');
    }

    if (error.response?.status === 500) {
      console.error('❌ Server error');
    }

    return Promise.reject(error);
  },
);

export default REQUEST;
