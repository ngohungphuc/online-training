import * as Auth from './store/actions/auth.actions';
import * as fromAuth from './store/index';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {
  }

  canActivate(): Observable<boolean> {
    this.store.select(fromAuth.selectAuthStatusState).subscribe(res => {
      console.log(res);
    });
    debugger
    return this.store
      .select(fromAuth.selectAuthStatusState)
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
