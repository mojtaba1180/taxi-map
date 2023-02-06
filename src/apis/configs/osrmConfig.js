import axios from "axios";
import env from '../../../env.json';

const OsrmApi = axios.create({
  baseURL:env.VITE_MAP_API_OSRM_URL,
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