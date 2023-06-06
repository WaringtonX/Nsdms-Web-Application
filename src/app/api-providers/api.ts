import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiProvider {
  timeout = 100000;
  baseUrl = environment.apiBase;
  constructor(public http: HttpClient) {}
  public get = (endpoint: string, params?: any, reqOpts?: any) =>
    this.http
      .get(`${this.baseUrl}/api/${endpoint}`, reqOpts)
      .pipe(timeout(this.timeout));

  public post = (endpoint: string, body?: any, reqOpts?: any) =>
    this.http
      .post(`${this.baseUrl}/api/${endpoint}`, body, reqOpts)
      .pipe(timeout(this.timeout));

  public put = (endpoint: string, body: any, reqOpts?: any) =>
    this.http
      .put(`${this.baseUrl}/api/${endpoint}`, body, reqOpts)
      .pipe(timeout(this.timeout));

  public delete = (endpoint: string, reqOpts?: any) =>
    this.http
      .delete(`${this.baseUrl}/api/${endpoint}`, reqOpts)
      .pipe(timeout(this.timeout));

  public patch = (endpoint: string, body: any, reqOpts?: any) =>
    this.http
      .put(`${this.baseUrl}/api/${endpoint}`, body, reqOpts)
      .pipe(timeout(this.timeout));
}
