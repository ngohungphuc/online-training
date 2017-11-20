import { Action } from '@ngrx/store';

export const PATH_DETAIL_PAGE = 'PATH_DETAIL_PAGE';

export class PathDetailPage implements Action {
  readonly type = PATH_DETAIL_PAGE;
  constructor(public payload: any) {}
}


export type Actions = PathDetailPage;
