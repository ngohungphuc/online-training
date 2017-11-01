import { environment } from './../../../environments';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { StatusCode } from '../enum/status-code';
import { StorageService } from './storage.service';
import { TokenModel } from '../models/token.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private tokenKey = 'currentUserInfo';
  private currentUser = JSON.parse(localStorage.getItem(this.tokenKey));
  constructor(private http: Http, private storageService: StorageService) {
  }

  Get(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });
    return this.http.get(apiUrl, options).catch(this.handleServerError);
  }

  Post(url: string, data: any): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.post(apiUrl, body, options).catch(this.handleServerError);
  }

  Put(url: string, data: Object): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.put(apiUrl, body, options).catch(this.handleServerError);
  }

  Delete(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(apiUrl, options).catch(this.handleServerError);
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
    if (this.currentUser !== null) {
      return this.currentUser.access_token;
    }
  }

  private generateRefreshTokenUrl() {
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
    if (err instanceof Response) {
      if (err.status === StatusCode.Unauthorized) {
        this.generateRefreshTokenUrl();
        return Observable.throw(err.json() || 'backend server error');
      }
    }
    return Observable.throw(err || 'backend server error');
  }
}
