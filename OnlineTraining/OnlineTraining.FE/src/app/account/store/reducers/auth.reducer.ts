import { AuthState } from '../index';
import { BaseAction } from '../../../common/core/state-management/actions/base.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  IS_AUTHENTICATE,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NOT_LOGIN,
  TOKEN_EXPIRE
  } from './../actions/auth.actions';

export const initialState: AuthState = {
  loggedIn: false,
  errorMsg: null
};

export function authReducer(state = initialState, action: BaseAction) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        tokenInfo: action.payload,
      };
    case TOKEN_EXPIRE:
      return {
        ...state,
        tokenInfo: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
}





