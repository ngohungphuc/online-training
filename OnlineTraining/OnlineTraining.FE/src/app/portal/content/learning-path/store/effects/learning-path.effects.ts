import * as learningPath from '../actions/learning-path.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from './../../../../../common/services/auth.service';
import { ERROR } from '../../../../store/actions/portal.actions';
import { GET_LEARNING_PATH_SUCCESS } from '../actions/learning-path.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class LearningPathEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  getLearningPath$: Observable<Action> = this.actions$
    .ofType(learningPath.GET_LEARNING_PATH)
    .mergeMap((action: learningPath.GetLearningPath) =>
      this.authService
        .Get('api/LearningPath')
        .map(responseData => {
          const data = responseData.json();
          return { type: GET_LEARNING_PATH_SUCCESS, payload: data };
        })
        .catch(error => {
          return of({ type: ERROR, payload: error });
        })
    );
}
