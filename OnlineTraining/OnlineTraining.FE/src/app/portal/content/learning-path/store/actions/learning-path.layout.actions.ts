import { Action } from '@ngrx/store';

export const DETAIL_PAGE = 'DETAIL_PAGE';

export class DetailPage implements Action {
    readonly type = DETAIL_PAGE;
}

export type Actions = DetailPage;

