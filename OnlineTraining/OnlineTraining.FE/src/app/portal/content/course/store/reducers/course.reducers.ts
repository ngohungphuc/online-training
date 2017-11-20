import * as course from '../actions/course.actions';

export interface CourseState {
    courseState: Course;
}

export interface Course {
  isCourseDetailPage: boolean;
  courseDetail: any;
  courseByPathId: any;
  courseMedia: any;
}

export const initialState: Course = {
  isCourseDetailPage: false,
  courseDetail: null,
  courseByPathId: null,
  courseMedia: null
};

export function courseReducer(state = initialState, action: course.Actions) {
    switch (action.type) {
        case course.GET_COURSE_DETAIL_PAGE:
            return {
              ...state,
               id: action.payload
            };
        case course.GET_COURSE_DETAIL_PAGE_SUCCESS:
            return {
              ...state,
              courseDetail: action.payload,
              isCourseDetailPage: true
            };
        case course.GET_COURSE_BY_LEARNING_PATH_ID_SUCCESS:
            return {
              ...state,
              courseByPathId: action.payload
            };
        case course.GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID_SUCCESS:
            return {
              ...state,
              courseMedia: action.payload
            };
        case course.BACK_TO_COURSE_DETAIL_PAGE_PATH:
            return {
              ...state,
              isCourseDetailPage: false
            };
        default:
            return state;
    }
}

export const courseDetail = (state: CourseState) => state.courseState.courseDetail;
export const isCourseDetailPage = (state: CourseState) => state.courseState.isCourseDetailPage;
export const getCourseByPathId = (state: CourseState) =>
state.courseState.courseByPathId;
export const getCourseMediaByCourseDetailId = (state: CourseState) =>
state.courseState.courseMedia;
