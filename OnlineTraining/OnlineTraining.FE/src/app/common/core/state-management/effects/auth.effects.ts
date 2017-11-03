import * as auth from '../actions/auth.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/auth.actions';
import { LoginService } from '../../../services/login.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private loginService: LoginService) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType<auth.Login>(auth.LOGIN)
    .mergeMap(action =>
      this.loginService
        .login(action.payload)
        // If successful, dispatch success action with result
        .map(accessTokenInfo => ({
          type: LOGIN_SUCCESS,
          payload: accessTokenInfo,
        }))
        // If request fails, dispatch failed action
        .catch(() => of({ type: LOGIN_FAIL }))
    );
}
