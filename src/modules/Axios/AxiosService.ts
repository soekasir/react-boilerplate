import Axios from 'axios';
import ENV from '../../env';

export const AxiosService=(baseURL:string)=>{
  const base=Axios.create();
  base.defaults.baseURL = baseURL
  return base;
}

export const myDataApi=(()=>{
  const base=AxiosService(ENV.myDataApi);
  base.interceptors.request.use((config)=>{
    config.headers.Authorization="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJjbGllbnRJZCI6ImFiYzEyMyIsImlhdCI6MTczNDA3MDY3NywiZXhwIjoxNzM0MjQzNDc3fQ.Dq5vAZ2hQktbCAzEPD6WoZN4S1hzPB3788BWkZM5lTQ";
    return config;
  })

  return base;
})();