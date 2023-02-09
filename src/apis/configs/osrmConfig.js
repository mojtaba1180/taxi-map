import axios from "axios";

const OsrmApi = axios.create({
  baseURL:import.meta.env.VITE_MAP_API_OSRM_URL,
});

OsrmApi.interceptors.request.use(
  function (config) {
      return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

OsrmApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default OsrmApi;