import * as fromBookmark from '../../portal/content/bookmarks/store/reducers/bookmark.reducer';
import * as fromLearningPath from '../../portal/content/learning-path/store/reducers/learning-path.reducer';
import * as fromLearningPathLayout from '../../portal/content/learning-path/store/reducers/learning-path.layout.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';


export interface PortalState {
    learningPathState: fromLearningPath.LearningPath;
    learningPathLayoutState: fromLearningPathLayout.LearningPathLayout;
    bookmarkState: fromBookmark.BookMarkState;
}

export const portalReducers: ActionReducerMap<PortalState> = {
    learningPathState: fromLearningPath.learningPathReducer,
    learningPathLayoutState: fromLearningPathLayout.learningPathLayoutReducer,
    bookmarkState: fromBookmark.bookmarkReducer
};
