import axios from "axios";


const http = axios.create({
  baseURL: import.meta.env.VITE_MAP_API_URL,
});

http.interceptors.request.use(
  function (config) {
    if(config.env.type){
      switch(config.env.type){
       case "nominatim" : 
         return{
           ...config,
           baseURL:import.meta.env.VITE_MAP_API_URL
         }
       case "osrm" :
         return{
           ...config,
           baseURL:import.meta.env.VITE_MAP_API_OSRM_URL
         }
       default:
         return{
           ...config,
           baseURL:import.meta.env.VITE_MAP_API_URL
         } 
      }
    }else{
      return{
        ...config,
      } 
    }
    ;
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