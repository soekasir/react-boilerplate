import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelTokenStatic } from 'axios';

type requestType='post'|'patch'|'put'|'get'|'delete';

export class AxiosService {
  public cancelToken: CancelTokenStatic = Axios.CancelToken;
  public axios: AxiosInstance

  constructor(baseUrl: string) {
    this.axios=Axios.create();
    this.axios.defaults.baseURL=baseUrl
  }

  private createRequest(requestType:requestType,url: string = '', data?: any, config: AxiosRequestConfig = {}) {
    return new Promise((resolve,reject)=>{
      (data ? this.axios[requestType](url, data, config) : this.axios[requestType](url, config) as AxiosPromise)
        .catch((error) => reject(error))
        .then((response) => {
          if (response) {
            resolve(response.data);
          }
        });
    })
}

  public post(url: string = '', data?: any, config: AxiosRequestConfig = {}) {
    return this.createRequest('post',url,data,config)
  }

  public patch(url: string = '', data?: any, config: AxiosRequestConfig = {}) {
    return this.createRequest('patch',url,data,config)
  }

  public put(url: string = '', data?: any, config: AxiosRequestConfig = {}) {
    return this.createRequest('put',url,data,config)
  }

  public get(url: string = '', config: AxiosRequestConfig = {}) {
    return this.createRequest('get',url,null,config)
  }

  public delete(url: string = '', config: AxiosRequestConfig = {}) {
    return this.createRequest('delete',url,null,config)
  }
}
