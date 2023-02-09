import axios from "axios";

const mainHttp = axios.create({
  baseURL: import.meta.env.VITE_MAIN_API_URL
});

mainHttp.interceptors.request.use(
  function (config) {
      return{
        ...config,

      };
  },
  function (err) {
    return Promise.reject(err);
  }
);

mainHttp.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default mainHttp;