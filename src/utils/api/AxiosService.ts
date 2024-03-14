import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import { Observable } from 'rxjs';

export class AxiosService {
  public cancelToken: CancelTokenStatic = Axios.CancelToken;
  public axios: AxiosInstance

  constructor(baseUrl: string) {
    this.axios=Axios.create();
    this.axios.defaults.baseURL=baseUrl
  }

  public post<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.post(url, data, config) as AxiosPromise)
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

  public patch<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.patch(url, data, config) as AxiosPromise)
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

  public put<T = any>(url: string = '', data?: any, config: AxiosRequestConfig = {}): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.put(url, data, config) as AxiosPromise)
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

  public get<T = any>(url: string = '', config: AxiosRequestConfig = {}): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.get(url, config) as AxiosPromise)
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

  public delete<T = any>(url: string = '', config: AxiosRequestConfig = {}): Observable<T> {
    return new Observable((observer) => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.delete(url, config) as AxiosPromise)
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
}
