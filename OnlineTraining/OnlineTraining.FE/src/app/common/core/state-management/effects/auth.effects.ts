import * as auth from '../actions/auth.actions';
import { AccessTokenInfo } from '../models/user.credential';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/auth.actions';
import { LoginService } from '../../../services/login.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { StatusCode } from '../../../enum/status-code';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<auth.Login>(auth.LOGIN)
    .mergeMap(action =>
      this.loginService
        .login(action.payload)
        .switchMap(responseData => {
          const statusCode = responseData.json().code;
          const data = responseData.json().data;
          const message = responseData.json().message;
          console.log(responseData.json());

          if (statusCode === StatusCode.InvalidUserInfo) {
            return of({ type: LOGIN_FAIL , payload : { message: message } });
          }
          if (statusCode === StatusCode.LoginSuccess) {
            return of({ type: LOGIN_SUCCESS , payload : { data: data } });
          }
        }).catch(() => of({ type: LOGIN_FAIL }))
    );
}
