import axios from "axios";
import env from '../../../env.json';

const mainHttp = axios.create({
  baseURL: env.VITE_MAIN_API_URL,
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