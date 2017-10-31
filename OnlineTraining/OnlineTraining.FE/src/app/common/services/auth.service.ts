import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
  private tokenKey = 'currentUserInfo';
  private token: string;
  private currentUser;
  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUserInfo'));
    this.token = this.currentUser && this.currentUser.token;
  }

  Get(url: string): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });
    return this.http
      .get(apiUrl, options)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  Post(url: string, data: any): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(apiUrl, body, options)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  Put(url: string, data: Object): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http
      .put(apiUrl, body, options)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
  }

  Delete(url: string, data: any): Observable<any> {
    const apiUrl = this.generateOTApiUrl(url);
    const body = JSON.stringify(data);
    const headers = this.initAuthHeaders();
    const options = new RequestOptions({ headers: headers });

    return this.http
      .delete(apiUrl, options)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      );
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
    if (!this.token) {
      const data = JSON.parse(localStorage.getItem('currentUserInfo'));
      this.token = data.access_token;
    }
    return this.token;
  }
}
