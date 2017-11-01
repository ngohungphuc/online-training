import { environment } from './../../../environments';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StatusCode } from '../enum/status-code';
import { StorageService } from './storage.service';
import 'rxjs/add/operator/catch';
import { TokenModel } from '../models/token.model';

@Injectable()
export class AuthService {
  private tokenKey = 'currentUserInfo';
  private token: string;
  private currentUser;
  constructor(private http: Http, private storageService: StorageService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUserInfo'));
    this.token = this.currentUser && this.currentUser.token;
  }

  Get(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl, options).catch(error => {
      if (error.status === StatusCode.Unauthorized) {
        this.generateRefreshTokenUrl();
      } else {
        return null;
      }
    });
  }

  Post(url: string, data: any): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.post(apiUrl, body, options).catch(error => {
      if (error.status === StatusCode.Unauthorized) {
        this.generateRefreshTokenUrl();
      } else {
        return null;
      }
    });
  }

  Put(url: string, data: Object): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.put(apiUrl, body, options).catch(error => {
      if (error.status === StatusCode.Unauthorized) {
        this.generateRefreshTokenUrl();
      } else {
        return null;
      }
    });
  }

  Delete(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(apiUrl, options).catch(error => {
      if (error.status === StatusCode.Unauthorized) {
        this.generateRefreshTokenUrl();
      } else {
        return null;
      }
    });
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
    if (this.token !== null) {
      this.token = this.currentUser.access_token;
    }
    return this.token;
  }

  private generateRefreshTokenUrl() {
    if (this.currentUser !== null) {
      const refreshTokenUrl = `auth?grant_type=refresh_token&username=${this
        .currentUser.account}&refresh_token=${this.currentUser.refresh_token}`;
      this.Get(refreshTokenUrl).subscribe(result => {
        const data = JSON.parse(result.json().data) as TokenModel;
        console.log(data.access_token);
/*         localStorage.removeItem('currentUserInfo');
        localStorage.setItem(
          'currentUserInfo',
          JSON.stringify({ 'account': data.account,
             'access_token': data.access_token,
             'expire_in': data.expires_in,
             'refresh_token': data.refresh_token })); */
             debugger;
      });
    }
  }
}
