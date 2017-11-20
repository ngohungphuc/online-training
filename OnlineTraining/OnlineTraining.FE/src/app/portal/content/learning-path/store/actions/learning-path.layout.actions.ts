import { Action } from '@ngrx/store';

export const PATH_DETAIL_PAGE = 'PATH_DETAIL_PAGE';
export const BACK_TO_COURSE_DETAIL_PAGE_PATH = 'BACK_TO_COURSE_DETAIL_PAGE_PATH';

export class PathDetailPage implements Action {
  readonly type = PATH_DETAIL_PAGE;
  constructor(public payload: any) {}
}

export class BackToCourseDetailPagePath implements Action {
  readonly type = BACK_TO_COURSE_DETAIL_PAGE_PATH;
}

export type Actions =
PathDetailPage |
BackToCourseDetailPagePath;
