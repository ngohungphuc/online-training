import { BaseAction } from '../../../common/core/state-management/actions/base.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './../actions/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  errorMsg: string;
}

export const initialState: AuthState = {
  loggedIn: false,
  errorMsg: null
};

export function authReducer(state = initialState, action: auth.Actions) {
  switch (action.type) {
    case auth.LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case auth.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        tokenInfo: action.payload
      };
    case auth.TOKEN_EXPIRE:
      return {
        ...state,
        tokenInfo: action.payload
      };
    case auth.LOGIN_FAIL:
      return {
        ...state,
        errorMsg: 'Invalid user credential'
      };
    case auth.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const getLoginState = (state: AuthState) => state.loggedIn;
export const getLoginStatus = (state: AuthState) => state.errorMsg;
