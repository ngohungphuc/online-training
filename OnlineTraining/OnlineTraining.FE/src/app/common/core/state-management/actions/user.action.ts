import { UserData } from '../state/user.state';
import { BaseAction } from './base.action';


export class UserActions {
  static readonly LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
  static readonly LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';

  loadUserSuccess(user: UserData): BaseAction {
    return {
      type: UserActions.LOAD_USER_SUCCESS,
      payload: {
        user
      }
    };
  }

  loadUserFailure(message: string): BaseAction {
    return {
      type: UserActions.LOAD_USER_FAILURE,
      payload: {
        message
      }
    };
  }
}
