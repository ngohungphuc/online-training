import * as fromCourse from '../store/reducers/course.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectCourseState = createFeatureSelector('portalModule');

export const selectCourseByPathId = createSelector(
  selectCourseState,
  fromCourse.getCourseByPathId
);

export const selectCourseDetailByCourseId = createSelector(
  selectCourseState,
  fromCourse.courseDetail
);

export const selectCourseDetailPageState = createSelector(
  selectCourseState,
  fromCourse.isCourseDetailPage
);

export const selectCourseMediaByCourseDetailId = createSelector(
  selectCourseState,
  fromCourse.getCourseMediaByCourseDetailId
);




