import * as fromCourseDetail from '../store/index';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import {
   BACK_TO_COURSE_DETAIL_PAGE_PATH,
  GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID } from '../store/actions/course.actions';
import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store/';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ota-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@AutoUnsubscribe()
export class CourseDetailComponent implements OnInit, OnDestroy {
  courseDetailList: Subscription;
  loading = true;
  blobUrl: string;

  constructor(
    private store: Store<any>,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCourseMedia();
    this.getBlobUrl();
  }

  getBlobUrl(){
    this.store.select(fromCourseDetail.selectCourseMediaByCourseDetailId).subscribe(res => {
      if (res !== null) {
        this.blobUrl = res.blobUrl;
        this.ref.markForCheck();
      }
    });
  }

  getCourseMedia() {
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      this.courseDetailList = res;
      this.loading = false;
      // init for default video to load
      this.store.dispatch(
        {type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID,
        payload: res[0].courseModule[0].courseMediaId});
    });
  }

  backToPrevious() {
    this.store.dispatch({ type: BACK_TO_COURSE_DETAIL_PAGE_PATH });
  }

  viewCourse(courseMediaId) {
    this.store.dispatch(
      {type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID,
      payload: courseMediaId});
    this.getBlobUrl();
  }

  ngOnDestroy() {

  }
}
