import { BaseAction } from '../actions/base.action';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import {
  IS_AUTHENTICATE,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  NOT_LOGIN,
  TOKEN_EXPIRE
} from './../actions/auth.actions';

export const initialState: AuthState = {
  loggedIn: false
};

export function authReducer(state = initialState, action: BaseAction) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        user: action.payload
      });
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


export interface LoginState {
  errorMsg: string;
}

export const getLoginState = createFeatureSelector<LoginState>('auth');
export const getLoginStateStatus = createSelector(
  getLoginState,
  (state: LoginState) => state.errorMsg
);

export interface AuthState {
  loggedIn: boolean;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthStateStatus = createSelector(
  getAuthState,
  (state: AuthState) => state.loggedIn
);

