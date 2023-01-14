import axios from "axios";


const http = axios.create({
  baseURL: "https://api.tapsi.cab/api/v2.2",
});

http.interceptors.request.use(
  function (config) {
    return config;
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