import * as learningPathLayout from '../actions/learning-path.layout.actions';
import { GET_COURSE_DETAIL_PAGE_SUCCESS } from '../actions/learning-path.layout.actions';

export interface LearningPathLayoutState {
    learningPathLayoutState: LearningPathLayout;
}

export interface LearningPathLayout {
  isPathDetailPage: boolean;
  isCourseDetailPage: boolean;
  pathId: string;
  learningPathDescription: string;
  courseDetail: any;
}

export const initialState: LearningPathLayout = {
  isPathDetailPage: false,
  isCourseDetailPage: false,
  pathId: null,
  learningPathDescription: null,
  courseDetail: null
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
        case learningPathLayout.GET_COURSE_DETAIL_PAGE:
            return {
              ...state,
               id: action.payload
            };
        case learningPathLayout.GET_COURSE_DETAIL_PAGE_SUCCESS:
            return {
              ...state,
              courseDetail: action.payload,
              isCourseDetailPage: true
            };
        case learningPathLayout.BACK_TO_COURSE_DETAIL_PAGE_PATH:
            return {
              ...state,
              isCourseDetailPage: false
            };
        default:
            return state;
    }
}

export const isDetailPageState = (state: LearningPathLayoutState) => state.learningPathLayoutState.isPathDetailPage;
export const pathId = (state: LearningPathLayoutState) => state.learningPathLayoutState.pathId;
export const learningPathDescription = (state: LearningPathLayoutState) => state.learningPathLayoutState.learningPathDescription;
export const learningPathDetail = (state: LearningPathLayoutState) => state.learningPathLayoutState;
export const courseDetail = (state: LearningPathLayoutState) => state.learningPathLayoutState.courseDetail;

