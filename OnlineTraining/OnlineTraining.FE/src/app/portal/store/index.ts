import { createFeatureSelector, createSelector } from '@ngrx/store';


import { ActionReducerMap } from '@ngrx/store';
import * as fromLearningPath from '../../portal/content/learning-path/store/reducers/learning-path.reducer';

export interface PortalState {
    learningPathReducer: fromLearningPath.LearningPathState;
}

export const portalReducers: ActionReducerMap<PortalState> = {
    learningPathReducer: fromLearningPath.learningPathReducer
};
