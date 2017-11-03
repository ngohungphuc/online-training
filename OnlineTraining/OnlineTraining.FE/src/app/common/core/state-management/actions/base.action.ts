import { Action } from '@ngrx/store';
export interface BaseAction extends Action {
  type: string;
  payload?: any;
}
