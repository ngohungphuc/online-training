import * as Auth from '../actions/auth.action';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { UserActions } from '../actions/user.action';
import { UserCredentials } from '../models/user.credential';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthEffects {
  constructor(
    private loginService: LoginService,
    private userActions: UserActions,
    private actions$: Actions,
    private router: Router
  ) {}

  /**
   * On the LOGIN action, this effect will make a request to authenticate.
   * If not authenticated, it will emit a LOAD_USER_FAILURE action.
   * Otherwise, it will emit a LOAD_USER_SUCCESS action.
   */
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login) => action.payload)
    .exhaustMap(credentials =>
      this.loginService
        .login(credentials)
        .map(user => new Auth.LoginSuccess({ user }))
        .catch(error => of(new Auth.LoginFailure(error)))
    );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/account/login']);
    });
}
