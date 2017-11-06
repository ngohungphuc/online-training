import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import * as fromRoot from '../../common/core/state-management/reducers/index';

export interface AuthState {
  errorMsg: string;
  loggedIn: boolean;
}

const selectAuthModule = createFeatureSelector<AuthState>('authModule');

export const selectAuthStatusState = createSelector(
    selectAuthModule,
    (state: AuthState) => state.loggedIn
);


