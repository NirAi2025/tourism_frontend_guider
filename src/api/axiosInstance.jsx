import axios from "axios";
import { getToken } from "../utils/token";
import store from "../redux/store";



const axiosInstance = axios.create({
  //  baseURL: "http://54.175.243.72:3000/api/", 
  baseURL: "https://api.tourguidetrack.in/api/", 
  timeout: 15000,
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    var token = null;
    var localToken = getToken();
    if (localToken) {
      token = localToken;
    } else {  
     token = store.getState().ReducerDataHandle.token;
    }

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

