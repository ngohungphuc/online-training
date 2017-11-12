import { Action } from '@ngrx/store';

export const ERROR = 'ERROR';

export class Error implements Action {
  readonly type = ERROR;
  constructor(public payload: string) {}
}

export type Actions = Error;
