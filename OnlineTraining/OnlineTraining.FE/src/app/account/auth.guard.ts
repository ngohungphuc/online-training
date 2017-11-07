import * as Auth from './store/actions/auth.actions';
import * as fromAuth from './store/index';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { REDIRECT } from './store/actions/auth.actions';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { StorageService } from '../common/services/storage.service';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    private storageService: StorageService,
    private cookieService: CookieService,
    private router: Router) {
  }

/*   canActivate(): Observable<boolean> {
    return this.store
      .select(fromAuth.selectAuthStatusState)
      .map(authed => {
        if (!authed) {
          this.store.dispatch({type: REDIRECT});
          return false;
        }
        return true;
      })
      .take(1);
  } */
  canActivate(): Observable<boolean> | boolean{
    const isLogin: boolean = this.cookieService.check(environment.cookieKey);
    if (!isLogin) {
      this.store.dispatch({type: REDIRECT});
      return false;
    }
    return true;
  }
}
