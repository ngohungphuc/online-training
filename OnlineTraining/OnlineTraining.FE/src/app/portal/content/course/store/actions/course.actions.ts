import { Action } from '@ngrx/store';
import { Course } from '../models/course.model';

export const GET_MY_COURSE = 'GET_MY_COURSE';
export const GET_COURSE_BY_LEARNING_PATH_ID = 'GET_COURSE_BY_LEARNING_PATH_ID';
export const GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS = 'GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS';
export const GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID = 'GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID';
export const GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS = 'GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS';
export const GET_COURSE_DETAIL_PAGE = 'GET_COURSE_DETAIL_PAGE';
export const GET_COURSE_DETAIL_PAGE_SUCCESS = 'GET_COURSE_DETAIL_PAGE_SUCCESS';
export const BACK_TO_COURSE_DETAIL_PAGE_PATH = 'BACK_TO_COURSE_DETAIL_PAGE_PATH';
export const BACK_TO_INDEX = 'BACK_TO_INDEX';

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

export class GetCourseDetailPage implements Action {
    readonly type = GET_COURSE_DETAIL_PAGE;
    constructor(public payload: any) {}
}

export class GetCourseDetailPageSuccess implements Action {
    readonly type = GET_COURSE_DETAIL_PAGE_SUCCESS;
    constructor(public payload: any) {}
}


export class BackToCourseDetailPagePath implements Action {
  readonly type = BACK_TO_COURSE_DETAIL_PAGE_PATH;
}

export class BackToIndex implements Action {
  readonly type = BACK_TO_INDEX;
}

export type Actions =
| GetCourseByLearningPathId
| GetCourseByLearningPathIdSuccess
| GetMyCourse
| GetCourseMediaByCourseDetailId
| GetCourseMediaByCourseDetailIdSuccess
| GetCourseDetailPage
| GetCourseDetailPageSuccess
| BackToCourseDetailPagePath
| BackToIndex;
