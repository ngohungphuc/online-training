import * as Auth from '../common/core/state-management/actions/auth.actions';
import * as fromAuth from '../common/core/state-management/reducers/auth.reducer';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.LoginState>) {}

  canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.getAuthStateStatus)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.Redirect());
          return false;
        }
        return true;
      })
      .take(1);
  }
}
