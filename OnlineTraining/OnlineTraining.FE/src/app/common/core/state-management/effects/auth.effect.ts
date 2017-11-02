import { Actions, Effect } from '@ngrx/effects';
import { AuthAction } from './../actions/auth.action';
import { Injectable } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { UserActions } from '../actions/user.action';
import { UserCredentials } from '../models/user.credential';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthEffects {

  constructor(private loginService: LoginService,
              private userActions: UserActions,
              private actions$: Actions) {}


   /**
   * On the LOGIN action, this effect will make a request to authenticate.
   * If not authenticated, it will emit a LOAD_USER_FAILURE action.
   * Otherwise, it will emit a LOAD_USER_SUCCESS action.
   */
  @Effect()
  login$ = this.actions$
    .ofType(AuthAction.LOGIN)
    .map(({payload}) => payload.credentials as UserCredentials)
    .switchMap(credentials => {
      return this.loginService.login(credentials)
        .map((res: any) => {
          if (res.isError) {
            return this.userActions.loadUserFailure(res.message);
          }
          return this.userActions.loadUserSuccess(res.user);
        });
    });
}