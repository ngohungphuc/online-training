import { AuthService } from './../../../../../common/services/auth.service';
import * as learningPath from '../actions/learning-path.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { GET_LEARNING_PATH_SUCCESS, ERROR } from '../actions/learning-path.actions';


@Injectable()
export class LearningPathEffects {
    private learningPathApi: string;
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {
      this.learningPathApi = `api/LearningPath`;
  }

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(learningPath.GET_LEARNING_PATH)
    .mergeMap((action: learningPath.GetLearningPath) =>
      this.authService
        .Get(this.learningPathApi)
        .map(responseData => {
          const data = responseData.json();
          return { type: GET_LEARNING_PATH_SUCCESS, payload: data };
        })
        .catch(error => {
          return of({ type: ERROR, payload: error });
        })
    );
}
