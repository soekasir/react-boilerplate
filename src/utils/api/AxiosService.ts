import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import { Observable } from 'rxjs';

type requestType='post'|'patch'|'put'|'get'|'delete';

export class AxiosService {
  public cancelToken: CancelTokenStatic = Axios.CancelToken;
  public axios: AxiosInstance

  constructor(baseUrl: string) {
    this.axios=Axios.create();
    this.axios.defaults.baseURL=baseUrl
  }

  private createRequest<T = any>(requestType:requestType,url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
      return new Observable((observer) => {
        const axiosCancel = this.cancelToken.source();
        config.cancelToken = axiosCancel.token;
  
        (data ? this.axios[requestType](url, data, config) : this.axios[requestType](url, config) as AxiosPromise)
          .catch((error) => observer.error(error))
          .then((response) => {
            if (response) {
              observer.next(response.data);
            }
            observer.complete();
          });
  
        return () => {
          axiosCancel.cancel();
          observer.complete();
        };
      });
  }

  public post<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.createRequest('post',url,data,config)
  }

  public patch<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.createRequest('patch',url,data,config)
  }

  public put<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return this.createRequest('put',url,data,config)
  }

  public get<T = any>(url: string = '', config: AxiosRequestConfig = {}): Observable<T> {
    return this.createRequest('get',url,null,config)
  }

  public delete<T = any>(url: string = '', config: AxiosRequestConfig = {}): Observable<T> {
    return this.createRequest('delete',url,null,config)
  }
}
