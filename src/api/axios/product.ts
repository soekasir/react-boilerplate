import axios from "axios"
import { URL_API } from "../../references/constants/env";
import headers from "./header";

export const apiCreateCategory=(name:string)=>{
  if (URL_API) return axios.post(
      URL_API+'product/category/create',{
        name:name,
      },
      headers
    ).then((res)=>{
    return res.data;
  });
}

export const apiCategory=()=>{
  if (URL_API) return axios.get(
      URL_API+'product/category',
      headers
    ).then((res)=>{
    return res.data;
  });
}

export interface Category{
  name:string;
  id:string;
}

export interface ProductDto {
  name: string;
  stock: number;
  description: string;
  category_id: string;
}

export interface GetProductDto extends ProductDto{
  category: Category;
  id: string;
}

export const apiCreateProduct=(data:ProductDto)=>{
  if (URL_API) return axios.post(
      URL_API+'product/create',
      data,
      headers
    ).then((res)=>{
    return res.data;
  });
}

export const apiListProduct=(limit:number,page:number)=>{
  if (URL_API) return axios.get(
      URL_API+'product/list',
      {
        ...headers,
        params:{
        limit,
        page
      }}
    ).then((res)=>{
    return res.data;
  });
}

export const apiDeleteProduct=(id:string)=>{
  if (URL_API) return axios.post(
      URL_API+'product/delete',
      {
        id
      },
      headers
    ).then((res)=>{
    return res.data;
  });
}

export const apiUpdateProduct=(id:string,data:ProductDto)=>{
  if (URL_API) return axios.post(
      URL_API+'product/update',
      {
        id
      },
      headers
    ).then((res)=>{
    return res.data;
  });
}