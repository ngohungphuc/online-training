import * as learningPath from '../actions/learning-path.actions';
import * as learningPathLayout from '../actions/learning-path.layout.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from './../../../../../common/services/auth.service';
import { ERROR } from '../../../../store/actions/portal.actions';
import { GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS, GET_LEARNING_PATH_SUCCESS } from '../actions/learning-path.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { GET_COURSE_DETAIL_PAGE_SUCCESS } from '../actions/learning-path.layout.actions';


@Injectable()
export class LearningPathEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {
  }

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


    @Effect()
    getCourseByPathId$: Observable<Action> = this.actions$
      .ofType(learningPath.GET_COURSE_BY_LEARNING_PATH_ID)
      .mergeMap((action: learningPath.GetCourseByLearningPathId) =>
        this.authService
          .Get(`api/Course/GetCourseByPathId/${action.payload}`)
          .map(responseData => {
            const data = responseData.json();
            return { type: GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS, payload: data };
          })
          .catch(error => {
            return of({ type: ERROR, payload: error });
          })
      );

    @Effect()
      getCourseDetailByCourseId$: Observable<Action> = this.actions$
        .ofType(learningPathLayout.GET_COURSE_DETAIL_PAGE)
        .mergeMap((action: learningPathLayout.GetCourseDetailPage) =>
          this.authService
            .Get(`api/CourseDetail/GetCourseDetailByCourseId/${action.payload}`)
            .map(responseData => {
              const data = responseData.json();
              console.log(data);
              return { type: GET_COURSE_DETAIL_PAGE_SUCCESS, payload: data };
            })
            .catch(error => {
              return of({ type: ERROR, payload: error });
            })
        );
}
