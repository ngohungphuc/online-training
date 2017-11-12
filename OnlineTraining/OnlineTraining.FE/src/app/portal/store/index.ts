import { createFeatureSelector, createSelector } from '@ngrx/store';


import { ActionReducerMap } from '@ngrx/store';
import * as fromLearningPath from '../../portal/content/learning-path/store/reducers/learning-path.reducer';
import * as  fromLearningPathLayout from '../../portal/content/learning-path/store/reducers/learning-path.layout.reducer';
import * as  fromBookmark from '../../portal/content/bookmarks/store/reducers/bookmark.reducer';
export interface PortalState {
    learningPathReducer: fromLearningPath.LearningPathState;
    learningPathLayoutReducer: fromLearningPathLayout.LearningPathLayoutState;
    bookmarkReducer: fromBookmark.BookMarkState;
}

export const portalReducers: ActionReducerMap<PortalState> = {
    learningPathReducer: fromLearningPath.learningPathReducer,
    learningPathLayoutReducer: fromLearningPathLayout.learningPathLayoutReducerState,
    bookmarkReducer: fromBookmark.bookmarkReducer
};
