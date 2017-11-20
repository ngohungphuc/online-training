import * as learningPathLayout from '../actions/learning-path.layout.actions';

export interface LearningPathLayoutState {
    learningPathLayoutState: LearningPathLayout;
}

export interface LearningPathLayout {
    isPathDetailPage: boolean;
    pathId: string;
    learningPathDescription: string;
}

export const initialState: LearningPathLayout = {
    isPathDetailPage: false,
    pathId: null,
    learningPathDescription: null,
};

export function learningPathLayoutReducer(state = initialState, action: learningPathLayout.Actions) {
    switch (action.type) {
        case learningPathLayout.PATH_DETAIL_PAGE:
            return {
                ...state,
                isPathDetailPage: action.payload.isDetailPage,
                pathId: action.payload.pathId,
                learningPathDescription: action.payload.learningPathDescription
            };
        default:
            return state;
    }
}

export const learningPathDetail = (state: LearningPathLayoutState) => state.learningPathLayoutState;
export const isDetailPageState = (state: LearningPathLayoutState) => state.learningPathLayoutState.isPathDetailPage;

