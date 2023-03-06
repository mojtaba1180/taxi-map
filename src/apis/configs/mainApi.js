import { showNotification } from "@mantine/notifications";
import axios from "axios";

const MainApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

MainApi.interceptors.request.use(
  function (config) {
      return{
        ...config,

      };
  },
  function (err) {
    return Promise.reject(err);
  }
);

MainApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (err) {
    if(err?.response.status === 401){
      showNotification({
        color:"red",
        title: "مشکلی رخ داده است",
        message: "دسترسی غیرمجاز  ۴۰۱"
      });
    }
    return Promise.reject(err);
  }
);

export default MainApi;