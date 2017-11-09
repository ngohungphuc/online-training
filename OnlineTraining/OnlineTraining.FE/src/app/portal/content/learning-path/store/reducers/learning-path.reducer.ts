import * as learningPath from '../actions/learning-path.actions';

export interface LearningPathState {
    pathList: any;
    learningPathReducer: any;
}

export const initialState: LearningPathState = {
    pathList: null,
    learningPathReducer: null
};

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

export const getPathList = (state: LearningPathState) => state.pathList;

