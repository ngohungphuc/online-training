import * as learningPathLayout from '../actions/learning-path.layout.actions';

export interface LearningPathReducer {
  learningPathLayoutReducer: any;
}

export interface LearningPathLayoutState extends LearningPathReducer{
    isDetailPage: boolean;
    pathInfo: any;
}

export const initialState: LearningPathLayoutState = {
    isDetailPage: false,
    learningPathLayoutReducer: null,
    pathInfo: null
};

export function learningPathReducer(state = initialState, action: learningPathLayout.Actions) {
    switch (action.type) {
        case learningPathLayout.DETAIL_PAGE:
            return {
                ...state,
                isDetailPage: action.payload.isDetailPage,
                pathInfo: action.payload.pathInfo
            };
        default:
            return state;
    }
}

export const getPathList = (state: LearningPathLayoutState) => state.isDetailPage;

