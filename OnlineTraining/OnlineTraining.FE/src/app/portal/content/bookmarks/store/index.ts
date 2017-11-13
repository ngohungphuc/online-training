import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBookmark from './reducers/bookmark.reducer';
export const selectBookmarkState = createFeatureSelector('portalModule');

export const selectBookmarkByUserId = createSelector(
    selectBookmarkState,
    fromBookmark.getBookmark
  );

