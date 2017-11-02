import { UserData } from '../state/user.state';
import { Action } from '@ngrx/store';

export class UserActions {
  static readonly LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
  static readonly LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';

  loadUserSuccess(user: UserData): Action {
    return {
      type: UserActions.LOAD_USER_SUCCESS,
      payload: {
        user
      }
    };
  }

  loadUserFailure(message: string): Action {
    return {
      type: UserActions.LOAD_USER_FAILURE,
      payload: {
        message
      }
    };
  }
}
