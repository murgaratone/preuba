import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpHeaders, HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseBack } from '../models/response-back-model';
import { firstValueFrom, lastValueFrom, Observable} from 'rxjs';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

export interface HeadersType {
  name: string; // name header
  key: string; // name to storage
}

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  url401 = '';
  reload = 0;

  public urlApi = environment.urlApi;

  constructor(
    private router: Router,
    private http: HttpClient,
    public storageService: StorageService,
    private snackBar: MatSnackBar,
  ) { }

  getHeaders(extraValues?: any): HttpHeaders {
    if (!extraValues) {
      extraValues = { 'Content-Type': 'application/json' };
    }
    if (this.getToken()) {
      return new HttpHeaders({
        'Authorization': `${this.getToken()}`,
        ...extraValues,
      });
    } else {
      return new HttpHeaders({
        ...extraValues,
      });
    }
  }

  public getToken(): string {
    return this.storageService.getValue('token') ?? null;
  }

  handleOnSuccess = (result: ResponseBack, notMessage?: boolean) => {
    if (result && result.details && result.details.message) {
      if (!notMessage) {
        this.snackBar.open(result.details.message, 'x', {
          duration: 2000,
          panelClass: ['snackbar-success'],
        });
      }
    }
    if (result && result.data) {
      return result.details.totalPag ? { data: result.data, pages: result.details.totalPag } : result.data;
    } else {
      return null;
    }
  };

  handleOnError = (result: ResponseBack | any, notMessage?: boolean) => {
    let logOut = false;
    if (notMessage) {
      if (result.error?.details?.message === 'jwt expired') {
        result.error.details.message = 'Tu sesión ha expirado'
        this.storageService.cleanUser();
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 10);
      }
      return null;
    }
    if (result && result.error?.details?.message) {
      if (result.error?.details?.message === 'jwt expired') {
        result.error.details.message = 'Tu sesión ha expirado'
        logOut = true;
      }
      this.snackBar.open(result.error.details.message, 'x', {
        duration: 2000,
        panelClass: ['snackbar-alert'],
      });
      if (logOut) {
        this.storageService.cleanUser();
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 10);
      }
      return null;
    }
    this.snackBar.open('Ocurrio un error', 'x', {
      duration: 2000,
      panelClass: ['snackbar-alert'],
    });
    return null;
  };

  public getAll(
    extension: string,
    url?: string,
    notMessage?: boolean,
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    return lastValueFrom(this.http
      .get<ResponseBack>(urlGet + extension, {
        headers: this.getHeaders(),
      })
      , { defaultValue: [] })
      .then((response: any) => {
       return this.handleOnSuccess(response, notMessage)})
      .catch((error: any) => this.handleOnError(error, notMessage));
  }  

  public getById(
    extension: string,
    id: string,
    extraParams?: HttpParams
  ): Promise<any> {
    return firstValueFrom(this.http
      .get<ResponseBack>(this.urlApi + extension + '/' + id, {
        headers: this.getHeaders(),
        params: { ...extraParams },
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public postById(element: any, extension: string, url?: string): Promise<any> {
    return firstValueFrom(this.http
      .post<ResponseBack>(this.urlApi + extension + '/' + element.id, element, {
        headers: this.getHeaders(),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public post(element: any, extension: string, url?: string): Promise<any> {
    this.cleanObject(element);
    const urlGet = url ? url : this.urlApi;
    return firstValueFrom(this.http
      .post<ResponseBack>(urlGet + extension, element, {
        headers: this.getHeaders(),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }


  public postHeader(element: any, extension: string, header: Array<HeadersType>, url?: string): Promise<any> {
    this.cleanObject(element);
    const urlGet = url ? url : this.urlApi;
    return firstValueFrom(this.http
      .post<HttpResponse<ResponseBack>>(urlGet + extension, element, {
        headers: this.getHeaders(),
        observe: 'response' as 'response'
      })).then((data: HttpResponse<any>) => {
        header && header.forEach((head) => {
          const authToken = data.headers.get(head.name);
          this.storageService.setValue(head.key, authToken);
        })
        return this.handleOnSuccess(data.body)
      }).catch(this.handleOnError);

  }


  public patch(element: any, extension: string): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(this.http
      .patch<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders(),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public update(element: any, extension: string, extraHeaders?: any, notId?: boolean): Promise<any> {
    this.cleanObject(element);
    const id= element.id;
    if(notId){
      delete element['id'];
    }
    return firstValueFrom(this.http
      .put<ResponseBack>(this.urlApi + extension +(id? '/' + id: ''), element, {
        headers: this.getHeaders(extraHeaders),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }


  public disable(element: any, id: any, extension: string, extraHeaders?: any): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(this.http
      .put<ResponseBack>(this.urlApi + extension + '/' + id, element, {
        headers: this.getHeaders(extraHeaders),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }


  public delete(
    extension: string,
    id?: string | number,
    url?: string,
    extraParams?: HttpParams
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    const params = id ? { id, ...extraParams } : { ...extraParams };
    return firstValueFrom(this.http
      .delete<ResponseBack>(urlGet + extension, {
        headers: this.getHeaders(),
        params: params,
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }


  public postMultipart(element: any, extension: string): Promise<any> {
    this.cleanObject(element);
    return firstValueFrom(this.http
      .post<ResponseBack>(this.urlApi + extension, element, {
        headers: this.getHeaders({
          Accept: 'multipart/form-data',
        }),
      }))
      .then(this.handleOnSuccess)
      .catch(this.handleOnError);
  }

  public getFile(
    extension: string,
    url?: string,
  ): Observable<Blob> {
    const urlGet = url ? url : this.urlApi;
    const extraValues = { 
      'Content-Type': 'application/json'};
    const headers = this.getHeaders(extraValues);
    return this.http.get<Blob>(urlGet + extension, { headers, responseType: 'blob' as 'json'})
  }

  public getPDF(
    extension: string,
    url?: string,
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    const extraValues = {
      'Content-ype': 'application/json'
    }
    const headers = this.getHeaders(extraValues);
    return this.http
      .get(urlGet + extension, { headers, responseType: 'blob' as 'json' })
      .toPromise()
      .catch(this.handleOnError);
  }

  public getExcel(
    extension: string,
    url?: string,
  ): Promise<any> {
    const urlGet = url ? url : this.urlApi;
    const extraValues = {
      'Content-ype': 'application/octet-stream',
      'Accept': '*/*'
    }
    const headers = this.getHeaders(extraValues);
    return this.http
      .get(urlGet + extension, { headers, responseType: 'blob' as const })
      .toPromise()
      .catch(this.handleOnError);
  }

  cleanObject(element: any) {
    Object.keys(element).forEach((key) => {
      if (element[key] === null) {
        delete element[key];
      }
    });
  }
}
