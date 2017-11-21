import * as fromBookmark from './reducers/bookmark.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectBookmarkState = createFeatureSelector('portalModule');

export const selectBookmarkByUserId = createSelector(
    selectBookmarkState,
    fromBookmark.getBookmark
);

export const selectCourseByBookmarkId = createSelector(
  selectBookmarkState,
  fromBookmark.getCourseByBookmarkId
);
