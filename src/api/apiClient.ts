import axios from "axios";
import { store } from "../store/store";
import { setCredentials, clearCredentials } from "../store/authSlice";
import { axiosInstance } from "./index";

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Expired Token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      try {
        const { data } = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        store.dispatch(
          setCredentials({
            user: store.getState().auth.user,
            accessToken: data.accessToken,
          })
        );

        // Retry original request
        error.config.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosInstance.request(error.config);
      } catch (refreshError) {
        store.dispatch(clearCredentials());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
