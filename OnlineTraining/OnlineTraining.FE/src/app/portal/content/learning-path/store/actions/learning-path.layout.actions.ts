import { Action } from '@ngrx/store';

export const PATH_DETAIL_PAGE = 'PATH_DETAIL_PAGE';
export const GET_COURSE_DETAIL_PAGE = 'GET_COURSE_DETAIL_PAGE';
export const GET_COURSE_DETAIL_PAGE_SUCCESS = 'GET_COURSE_DETAIL_PAGE_SUCCESS';

export class PathDetailPage implements Action {
  readonly type = PATH_DETAIL_PAGE;
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


export type Actions = PathDetailPage | GetCourseDetailPage | GetCourseDetailPageSuccess;
