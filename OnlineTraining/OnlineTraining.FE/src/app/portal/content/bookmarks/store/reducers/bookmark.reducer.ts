import * as bookMark from '../actions/bookmark.actions';

export interface BookMarkState {
  bookmarkState: BookMark;
}

export interface BookMark {
  bookmark: any;
  courseByBookmarkId: any;
}

export const initialState: BookMark = {
  bookmark: null,
  courseByBookmarkId: null
};

export function bookmarkReducer(state = initialState, action: bookMark.Actions) {
    switch (action.type) {
        case bookMark.GET_BOOK_MARK:
            return {
                ...state,
                id: action.payload
            };
        case bookMark.GET_BOOK_MARK_SUCCESS:
            return {
                ...state,
                courseByBookmarkId: action.payload
            };
        case bookMark.GET_BOOK_MARK_BY_USERID_SUCCESS:
            return {
                ...state,
                bookmark: action.payload
            };
        case bookMark.BOOK_MARK_COURSE:
        case bookMark.UNDO_BOOK_MARK_COURSE:
            return {
                ...state,
                userId: action.payload.userId,
                courseId: action.payload.courseId
            };
        default:
            return state;
    }
}


export const getBookmark = (state: BookMarkState) => state.bookmarkState.bookmark;
export const getCourseByBookmarkId = (state: BookMarkState) => state.bookmarkState.courseByBookmarkId;

