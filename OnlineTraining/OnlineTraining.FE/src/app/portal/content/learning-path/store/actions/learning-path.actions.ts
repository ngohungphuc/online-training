import { Action } from '@ngrx/store';
import { Course } from '../model/course.model';
import { LearningPath } from '../model/learning-path.model';

export const GET_LEARNING_PATH = 'GET_LEARNING_PATH';
export const GET_LEARNING_PATH_SUCCESS = 'GET_LEARNING_PATH_SUCCESS';
export const GET_MY_COURSE = 'GET_MY_COURSE';
export const GET_COURSE_BY_LEARNING_PATH_ID = 'GET_COURSE_BY_LEARNING_PATH_ID';
export const GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS = 'GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS';
export const GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID = 'GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID';
export const GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS = 'GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS';
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

export class GetMyCourse implements Action {
  readonly type = GET_MY_COURSE;
  constructor(public payload: Course) {}
}

export class GetCourseMediaByCourseDetailId implements Action {
  readonly type = GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID;
  constructor(public payload: string) {}
}

export class GetCourseMediaByCourseDetailIdSuccess implements Action {
  readonly type = GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | GetLearningPath
  | GetCourseByLearningPathId
  | GetCourseByLearningPathIdSuccess
  | GetMyCourse
  | GetLearningPathSuccess
  | GetCourseMediaByCourseDetailId
  | GetCourseMediaByCourseDetailIdSuccess;
