import { Action } from '@ngrx/store';
import { AccessTokenInfo, UserCredentials } from '../models/user.credential';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const NOT_LOGIN = 'NOT_LOGIN';
export const IS_AUTHENTICATE = 'IS_AUTHENTICATE';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REDIRECT = 'REDIRECT';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: UserCredentials) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: string) {}
}

export class Redirect implements Action {
  readonly type = REDIRECT;
  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload: AccessTokenInfo) {}
}

export class TokenExpire implements Action {
  readonly type = TOKEN_EXPIRE;
  constructor(public payload: AccessTokenInfo) {}
}

export class LoginFail implements Action {
  readonly type = LOGIN_FAIL;
  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions = Login | Logout | Redirect | LoginSuccess | TokenExpire | LoginFail;

