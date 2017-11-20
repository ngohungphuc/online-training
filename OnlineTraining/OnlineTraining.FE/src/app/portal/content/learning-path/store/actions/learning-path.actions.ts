import { Action } from '@ngrx/store';
import { LearningPath } from '../model/learning-path.model';

export const GET_LEARNING_PATH = 'GET_LEARNING_PATH';
export const GET_LEARNING_PATH_SUCCESS = 'GET_LEARNING_PATH_SUCCESS';

export class GetLearningPath implements Action {
  readonly type = GET_LEARNING_PATH;
}

export class GetLearningPathSuccess implements Action {
  readonly type = GET_LEARNING_PATH_SUCCESS;
  constructor(public payload: LearningPath) {}
}

export type Actions =
  | GetLearningPath
  | GetLearningPathSuccess;
