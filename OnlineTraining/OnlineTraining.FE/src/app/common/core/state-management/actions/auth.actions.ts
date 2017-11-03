import { UserCredentials } from './../models/user.credential';
import { AccessTokenInfo } from '../models/user.credential';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const NOT_LOGIN = 'NOT_LOGIN';
export const IS_AUTHENTICATE = 'IS_AUTHENTICATE';
export const LOGIN = 'IS_LOGIN';
export const LOGOUT = 'LOGOUT';
export const REDIRECT = 'REDIRECT';
export const TOKEN_EXPIRE = 'TOKEN_EXPIRE';


export function redirect() {
  return {
    type: REDIRECT
  };
}

export function login(userCredentials: UserCredentials) {
  return {
    type: LOGIN,
    payload: {
      userCredentials
    }
  };
}

export function logout() {
    return {
      type: LOGOUT
    };
  }


export function loginSuccess(acessTokenInfo: AccessTokenInfo) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      acessTokenInfo
    }
  };
}

export function tokenExpire(acessTokenInfo: AccessTokenInfo) {
    return {
      type: TOKEN_EXPIRE,
      payload: {
        acessTokenInfo
      }
    };
  }

export function loginFail(msg) {
  return {
    type: LOGIN_FAIL,
    payload: {
      msg
    }
  };
}
