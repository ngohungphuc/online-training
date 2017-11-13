import * as learningPathLayout from '../actions/learning-path.layout.actions';

export interface LearningPathLayoutState {
    learningPathLayoutState: LearningPathLayout;
}

export interface LearningPathLayout {
    isDetailPage: boolean;
    pathId: string;
    learningPathDescription: string;
}

export const initialState: LearningPathLayout = {
    isDetailPage: false,
    pathId: null,
    learningPathDescription: null
};

export function learningPathLayoutReducer(state = initialState, action: learningPathLayout.Actions) {
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

export const isDetailPageState = (state: LearningPathLayoutState) => state.learningPathLayoutState.isDetailPage;
export const pathId = (state: LearningPathLayoutState) => state.learningPathLayoutState.pathId;
export const learningPathDescription = (state: LearningPathLayoutState) => state.learningPathLayoutState.learningPathDescription;
export const learningPathDetail = (state: LearningPathLayoutState) => state.learningPathLayoutState;
