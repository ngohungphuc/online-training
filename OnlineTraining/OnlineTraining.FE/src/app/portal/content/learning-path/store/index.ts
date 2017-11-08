import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningPathListState } from './reducers/learning-path.reducer';
import * as fromLearningPath from '../store/reducers/learning-path.reducer';

export const selectLearningPathState = createFeatureSelector<LearningPathListState>('portalModule');

export const selectLearningPathList = createSelector(
    selectLearningPathState,
    fromLearningPath.getPathList
);








