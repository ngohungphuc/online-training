import * as learningPath from '../actions/learning-path.actions';

export interface LearningPathReducer {
  learningPathReducer: any;
}

export interface LearningPathState extends LearningPathReducer{
    pathList: any;
    courseByPathId: any;
}

export const initialState: LearningPathState = {
    pathList: null,
    learningPathReducer: null,
    courseByPathId: null
};

export function learningPathReducer(state = initialState, action: learningPath.Actions) {
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
        default:
            return state;
    }
}

export const getPathList = (state: LearningPathState) => state.pathList;
export const getCourseByPathId = (state: LearningPathState) => state.courseByPathId;
