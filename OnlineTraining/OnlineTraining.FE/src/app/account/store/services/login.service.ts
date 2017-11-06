import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from '../models/user.credential';
import { environment } from '../../../../environments/environment';

@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    login(userCredentials: UserCredentials): Observable<any> {
        const loginUrl =  `${environment.serverUrl}/auth?grant_type=password&username=
        ${userCredentials.account}&password=${userCredentials.password}`;
        return this.http.get(loginUrl);
    }
}