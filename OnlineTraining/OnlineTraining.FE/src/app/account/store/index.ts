import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromRoot from '../../common/core/state-management/reducers/index';

export interface AuthState {
  errorMsg: string;
  loggedIn: boolean;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const selectAuthState = createFeatureSelector<AuthState>('authReducer');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggedIn
);

