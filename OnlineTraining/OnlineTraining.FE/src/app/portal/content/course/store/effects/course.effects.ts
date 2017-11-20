import * as course from '../actions/course.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from './../../../../../common/services/auth.service';
import { ERROR } from '../../../../store/actions/portal.actions';
import {
  GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS,
  GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS,
  GET_COURSE_DETAIL_PAGE_SUCCESS } from '../actions/course.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {
  }

    @Effect()
    getCourseByPathId$: Observable<Action> = this.actions$
      .ofType(course.GET_COURSE_BY_LEARNING_PATH_ID)
      .mergeMap((action: course.GetCourseByLearningPathId) =>
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
        .ofType(course.GET_COURSE_DETAIL_PAGE)
        .mergeMap((action: course.GetCourseDetailPage) =>
          this.authService
            .Get(`api/CourseDetail/GetCourseDetailByCourseId/${action.payload}`)
            .map(responseData => {
              const data = responseData.json();
              return { type: GET_COURSE_DETAIL_PAGE_SUCCESS, payload: data };
            })
            .catch(error => {
              return of({ type: ERROR, payload: error });
            })
        );


        @Effect()
        getCourseMediaByCourseDetailId$: Observable<Action> = this.actions$
          .ofType(course.GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID)
          .mergeMap((action: course.GetCourseMediaByCourseDetailId) =>
            this.authService
              .Get(`api/CourseMedia/GetCourseMediaByCourseId/${action.payload}`)
              .map(responseData => {
                const data = responseData.json();
                return { type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS, payload: data };
              })
              .catch(error => {
                return of({ type: ERROR, payload: error });
              })
          );
}
