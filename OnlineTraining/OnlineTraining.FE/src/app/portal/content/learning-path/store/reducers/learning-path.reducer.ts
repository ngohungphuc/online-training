import * as learningPath from '../actions/learning-path.actions';
import { GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS } from '../actions/learning-path.actions';

export interface LearningPathState {
  learningPathState: LearningPath;
}

export interface LearningPath {
  pathList: any;
  courseByPathId: any;
  courseMedia: any;
}

export const initialState: LearningPath = {
  pathList: null,
  courseByPathId: null,
  courseMedia: null
};

export function learningPathReducer(
  state = initialState,
  action: learningPath.Actions
) {
  switch (action.type) {
    case learningPath.GET_LEARNING_PATH_SUCCESS:
      return {
        ...state,
        pathList: action.payload
      };
    case learningPath.GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS:
      return {
        ...state,
        courseByPathId: action.payload
      };
    case learningPath.GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS:
      return {
        ...state,
        courseMedia: action.payload
      };
    default:
      return state;
  }
}

export const getPathList = (state: LearningPathState) =>
  state.learningPathState.pathList;
export const getCourseByPathId = (state: LearningPathState) =>
  state.learningPathState.courseByPathId;
export const getCourseMediaByCourseDetailId = (state: LearningPathState) =>
  state.learningPathState.courseMedia;
