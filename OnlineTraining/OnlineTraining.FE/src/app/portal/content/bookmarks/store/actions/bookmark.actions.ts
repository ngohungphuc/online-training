import { Action } from '@ngrx/store';
import { BookMark } from '../models/bookmark.model';


export const GET_BOOK_MARK = 'GET_BOOK_MARK';
export const GET_BOOK_MARK_SUCCESS = 'GET_BOOK_MARK_SUCCESS';
export const BOOK_MARK_COURSE = 'BOOK_MARK_COURSE';
export const UNDO_BOOK_MARK_COURSE = 'BOOK_MARK_COURSE';
export const BOOK_MARK_SUCCESS = 'BOOK_MARK_SUCCESS';
export const UNDO_BOOK_MARK_SUCCESS = 'UNDO_BOOK_MARK_SUCCESS';

export class GetBookMark implements Action {
  readonly type = GET_BOOK_MARK;
  constructor(public payload: string) {}
}

export class GetBookMarkSuccess implements Action {
  readonly type = GET_BOOK_MARK_SUCCESS;
  constructor(public payload: BookMark) {}
}

export class BookMarkCourse implements Action {
  readonly type = BOOK_MARK_COURSE;
  constructor(public payload: any) {}
}

export class BookMarkCourseSuccess implements Action {
  readonly type = BOOK_MARK_SUCCESS;
  constructor(public payload: boolean) {}
}

export class UndoBookMarkCourse implements Action {
  readonly type = BOOK_MARK_COURSE;
  constructor(public payload: any) {}
}

export class UndoBookMarkCourseSuccess implements Action {
  readonly type = UNDO_BOOK_MARK_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | GetBookMark
  | GetBookMarkSuccess
  | BookMarkCourse
  | UndoBookMarkCourse
  | BookMarkCourseSuccess
  | UndoBookMarkCourseSuccess;
