import { Action } from '@ngrx/store';
import { BookMark } from '../model/bookmark.model';
import { Course } from '../model/course.model';
import { LearningPath } from '../model/learning-path.model';

export const GET_LEARNING_PATH = 'GET_LEARNING_PATH';
export const GET_LEARNING_PATH_SUCCESS = 'GET_LEARNING_PATH_SUCCESS';
export const GET_BOOK_MARK = 'GET_BOOK_MARK';
export const GET_MY_COURSE = 'GET_MY_COURSE';
export const GET_COURSE_BY_LEARNING_PATH_ID = 'GET_COURSE_BY_LEARNING_PATH_ID';
export const GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS = 'GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS';
export const ERROR = 'ERROR';

export class GetLearningPath implements Action {
  readonly type = GET_LEARNING_PATH;
}

export class GetLearningPathSuccess implements Action {
  readonly type = GET_LEARNING_PATH_SUCCESS;
  constructor(public payload: LearningPath) {}
}

export class GetCourseByLearningPathId implements Action {
  readonly type = GET_COURSE_BY_LEARNING_PATH_ID;
  constructor(public payload: string) {
  }
}

export class GetCourseByLearningPathIdSuccess implements Action {
  readonly type = GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS;
  constructor(public payload: Course) {
  }
}

export class GetBookMark implements Action {
  readonly type = GET_BOOK_MARK;
  constructor(public payload: BookMark) {}
}

export class GetMyCourse implements Action {
  readonly type = GET_MY_COURSE;
  constructor(public payload: Course) {}
}

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}
export type Actions =
  | GetLearningPath
  | GetCourseByLearningPathId
  | GetCourseByLearningPathIdSuccess
  | GetBookMark
  | GetMyCourse
  | GetLearningPathSuccess
  | Error;
