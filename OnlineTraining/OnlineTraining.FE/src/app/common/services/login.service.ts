import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from '../core/state-management/models/user.credential';

@Injectable()
export class LoginService {
    constructor(private http: Http) {
    }

    login(userCredentials: UserCredentials): Observable<any> {
        const loginUrl =  `auth?grant_type=password&username=${userCredentials.account}&password=${userCredentials.password}`;
        return this.http.get(loginUrl);
    }
}