import axios from "axios"
import { URL_API } from "../../references/constants/env";

export const apiLogin=(email:string,password:string)=>{
  if (URL_API) return axios.post(
      URL_API+'auth/signin',{
        email:email,
        password:password,
      }
    ).then((res)=>{
    return res.data;
  });
}
