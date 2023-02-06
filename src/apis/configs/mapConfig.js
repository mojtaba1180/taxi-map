import axios from "axios";
import env from '../../../env.json';


const http = axios.create({
  baseURL: env.VITE_MAP_API_URL,
});

http.interceptors.request.use(
  function (config) {
      return{
        ...config,
      };
  },
  function (err) {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default http;