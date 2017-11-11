import * as auth from '../actions/auth.actions';
import { AccessTokenInfo } from '../models/user.credential';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actions/auth.actions';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { StorageService } from '../../../common/services/storage.service';
import { TokenModel } from '../../../common/models/token.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private storageSerivce: StorageService,
    private cookieService: CookieService
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(auth.LOGIN)
    .mergeMap((action: auth.Login) =>
      this.loginService
        .login(action.payload)
        .map(responseData => {
          const statusCode = responseData.json().code;
          const data = JSON.parse(responseData.json().data) as TokenModel;
          const message = responseData.json().message;
          const userInfo = {
            account: data.account,
            access_token: data.access_token,
            expire_in: data.expires_in,
            refresh_token: data.refresh_token
          };
          this.storageSerivce.setObject(environment.authKey, userInfo);
          return { type: LOGIN_SUCCESS, payload: data };
        })
        .catch(error => {
          return of({ type: LOGIN_FAIL, payload: error.statusText });
        })
    );

  /**
   * set the dispatch property value to false in the decorator
   * to note that the effect will not dispatch any new actions
   */
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/online-training/portal']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(auth.LOGOUT)
    .do(() => {
      this.storageSerivce.removeAllStorage();
      this.router.navigate(['/account/login']);
    });
}
