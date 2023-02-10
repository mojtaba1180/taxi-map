import axios from "axios";


const NomiApi = axios.create({
  baseURL: import.meta.env.VITE_NOMINATIM_URL,
});

NomiApi.interceptors.request.use(
  function (config) {
      return{
        ...config,
      };
  },
  function (err) {
    return Promise.reject(err);
  }
);

NomiApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default NomiApi;