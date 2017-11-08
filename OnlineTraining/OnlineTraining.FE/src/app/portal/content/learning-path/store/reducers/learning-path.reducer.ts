import * as learningPath from '../actions/learning-path.actions';

export interface LearningPathListState {
    pathList: LearningPathState;
}

export interface LearningPathState {
    name: string;
    totalCourses: string;
    pathIcon: string;
}

export const initialState: LearningPathListState = {
    pathList: null
};
/* 
 export const initialState: LearningPathState = {
    name: '',
    totalCourses: '',
    pathIcon: ''
};
  */
export function learningPathReducer(state = initialState, action: learningPath.Actions) {
    switch (action.type) {
        case learningPath.GET_LEARNING_PATH_SUCCESS:
            return {
                ...state,
                pathList: action.payload
            };
        default:
            return state;
    }
}

export const getPathList = (state: LearningPathListState) => state.pathList;

