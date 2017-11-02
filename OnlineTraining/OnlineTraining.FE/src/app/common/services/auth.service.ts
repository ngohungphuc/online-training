import { environment } from './../../../environments';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { StatusCode } from '../enum/status-code';
import { StorageService } from './storage.service';
import { TokenModel } from '../models/token.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  private tokenKey = 'currentUserInfo';
  private currentUser;
  constructor(private http: Http, private storageService: StorageService) {
  }

  Get(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl, options).catch((error) => this.handleServerError(error));
  }

  Post(url: string, data: any): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.post(apiUrl, body, options).catch((error) => this.handleServerError(error));
  }

  Put(url: string, data: Object): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.put(apiUrl, body, options).catch((error) => this.handleServerError(error));
  }

  Delete(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(apiUrl, options).catch((error) => this.handleServerError(error));
  }

  private initAuthHeaders(): Headers {
    const token = this.getLocalToken();
    const headers = new Headers();
    if (token !== null) {
      headers.append('Authorization', 'Bearer ' + token);
    }
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private generateOTApiUrl(url: string) {
    return `${environment.serverUrl}/${url}`;
  }

  private getLocalToken(): string {
    this.currentUser =  JSON.parse(localStorage.getItem(this.tokenKey));
    if (this.currentUser !== null) {
      return this.currentUser.access_token;
    }
  }

  private generateRefreshTokenUrl() {
    this.currentUser =  JSON.parse(localStorage.getItem(this.tokenKey));

    if (this.currentUser !== null) {
      const refreshTokenUrl = `auth?grant_type=refresh_token&username=${this
        .currentUser.account}&refresh_token=${this.currentUser.refresh_token}`;
       this.Get(refreshTokenUrl).subscribe(result => {
        const data = JSON.parse(result.json().data) as TokenModel;
        if (data !== null) {
          localStorage.setItem(
          this.tokenKey,
          JSON.stringify({ 'account': data.account,
             'access_token': data.access_token,
             'expire_in': data.expires_in,
             'refresh_token': data.refresh_token }));
        }
      });
    }
  }

  private handleServerError(err: any) {
    if (err.status === StatusCode.Unauthorized) {
     this.generateRefreshTokenUrl();
    }
    return Observable.throw('backend server error');
  }
}
