import { Action } from '@ngrx/store';
import { UserCredentials } from './../models/user.credential';

export class AuthAction {
  static readonly LOGIN = 'LOGIN';

  login(userCredentials: UserCredentials): Action {
    return {
      type: AuthAction.LOGIN,
      payload: { userCredentials }
    };
  }
}
