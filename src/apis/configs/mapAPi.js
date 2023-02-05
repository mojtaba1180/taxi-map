import axios from "axios";


const http = axios.create({
  baseURL: import.meta.env.VITE_MAP_API_URL,
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