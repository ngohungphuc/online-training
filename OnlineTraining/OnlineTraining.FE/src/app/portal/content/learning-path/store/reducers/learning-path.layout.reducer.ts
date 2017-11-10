import * as learningPathLayout from '../actions/learning-path.layout.actions';

export interface LearningPathReducer {
  learningPathLayoutReducer: any;
}

export interface LearningPathLayoutState extends LearningPathReducer{
    isDetailPage: boolean;
    pathId: any;
    learningPathDescription: string;
}

export const initialState: LearningPathLayoutState = {
    isDetailPage: false,
    learningPathLayoutReducer: null,
    pathId: null,
    learningPathDescription: null
};

export function learningPathLayoutReducerState(state = initialState, action: learningPathLayout.Actions) {
    switch (action.type) {
        case learningPathLayout.DETAIL_PAGE:
            return {
                ...state,
                isDetailPage: action.payload.isDetailPage,
                pathId: action.payload.pathId,
                learningPathDescription: action.payload.learningPathDescription
            };
        default:
            return state;
    }
}

export const getPathList = (state: LearningPathLayoutState) => state.isDetailPage;

