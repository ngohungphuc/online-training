import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningPathState } from './reducers/learning-path.reducer';
import * as fromLearningPath from '../store/reducers/learning-path.reducer';

export const selectLearningPathState = createFeatureSelector('portalModule');

export const selectLearningPathList = createSelector(
  selectLearningPathState,
  (state: LearningPathState) => state.learningPathReducer
);






