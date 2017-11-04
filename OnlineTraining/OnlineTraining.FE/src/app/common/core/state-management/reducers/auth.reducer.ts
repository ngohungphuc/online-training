import { BaseAction } from '../actions/base.action';
import {
  IS_AUTHENTICATE,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NOT_LOGIN,
  TOKEN_EXPIRE
} from './../actions/auth.actions';

export function authReducer(state = [], action: BaseAction) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.payload
      });
    case LOGIN_SUCCESS:
      console.log(action.payload);
      return Object.assign({}, state, {
        tokenInfo: action.payload
      });
    case TOKEN_EXPIRE:
      return Object.assign({}, state, {
        tokenInfo: action.payload
      });
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        msg: action.payload
      });
    default:
      return state;
  }
}
