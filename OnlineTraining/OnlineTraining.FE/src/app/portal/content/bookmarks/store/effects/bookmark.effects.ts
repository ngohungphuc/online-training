import * as bookmark from '../actions/bookmark.actions';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from './../../../../../common/services/auth.service';
import { BOOK_MARK_SUCCESS, GET_BOOK_MARK_SUCCESS, UNDO_BOOK_MARK_SUCCESS } from '../actions/bookmark.actions';
import { ERROR } from '../../../../store/actions/portal.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class BookmarkEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {

  }

  @Effect()
  getBookMark$: Observable<Action> = this.actions$
    .ofType(bookmark.GET_BOOK_MARK)
    .mergeMap((action: bookmark.GetBookMark) =>
      this.authService
        .Get('api/BookMark')
        .map(responseData => {
          const data = responseData.json();
          return { type: GET_BOOK_MARK_SUCCESS, payload: data };
        })
        .catch(error => {
          return of({ type: ERROR, payload: error });
        })
    );


    @Effect()
    bookMarkCourse$: Observable<Action> = this.actions$
      .ofType(bookmark.BOOK_MARK_COURSE)
      .mergeMap((action: bookmark.BookMarkCourse) =>
        this.authService
          .Get(`api/Bookmark/BookMarkCourse/${action.payload.courseId}/${action.payload.userId}`)
          .map(responseData => {
            return {type: BOOK_MARK_SUCCESS, payload: true};
          })
          .catch(error => {
            return of({ type: ERROR, payload: error });
          })
      );

      @Effect()
      undoBookMarkCourse$: Observable<Action> = this.actions$
        .ofType(bookmark.UNDO_BOOK_MARK_COURSE)
        .mergeMap((action: bookmark.UndoBookMarkCourse) =>
          this.authService
            .Get(`api/Bookmark/UndoBookMarkCourse/${action.payload.courseId}/${action.payload.userId}`)
            .map(responseData => {
              return {type: UNDO_BOOK_MARK_SUCCESS, payload: true};
            })
            .catch(error => {
              return of({ type: ERROR, payload: error });
            })
        );
}
