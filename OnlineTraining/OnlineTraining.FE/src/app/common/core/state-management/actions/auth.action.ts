import { BaseAction } from './base.action';
import { UserCredentials } from './../models/user.credential';

export class AuthAction {
  static readonly LOGIN = 'LOGIN';

  login(userCredentials: UserCredentials): BaseAction {
    return {
      type: AuthAction.LOGIN,
      payload: { userCredentials }
    };
  }
}
