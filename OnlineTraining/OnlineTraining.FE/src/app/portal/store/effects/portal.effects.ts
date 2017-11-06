import { AccessTokenInfo } from '../models/user.credential';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
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
export class PortalEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private storageSerivce: StorageService
  ) {}


}
