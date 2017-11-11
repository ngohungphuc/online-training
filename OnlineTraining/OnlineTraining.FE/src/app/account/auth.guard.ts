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
import { CookieService } from 'ngx-cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromAuth.State>,
    private storageService: StorageService,
    private cookieService: CookieService,
    private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    const isLogin = this.cookieService.get(environment.cookieKey);
    if (isLogin === undefined) {
      this.store.dispatch({type: REDIRECT});
      return false;
    }
    return true;
  }
}
