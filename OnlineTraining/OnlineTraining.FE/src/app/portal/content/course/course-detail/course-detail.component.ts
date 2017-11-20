import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import * as fromCourseDetail from '../store/index';
import {
  GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID,
  BACK_TO_COURSE_DETAIL_PAGE_PATH } from '../store/actions/course.actions';

@Component({
  selector: 'ota-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseDetailList: any;
  loading = true;
  blobUrl: string;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.getCourseMedia();
    this.getBlobUrl();
  }

  getBlobUrl(){
    this.store.select(fromCourseDetail.selectCourseMediaByCourseDetailId).subscribe(res => {
      if (res !== null) {
        this.blobUrl = res.blobUrl;
      }
    });
  }

  getCourseMedia() {
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      this.courseDetailList = res;
      this.loading = false;
      // init for default video to load
      this.store.dispatch({type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID, payload: res[0].courseModule[0].courseMediaId
      });
    });
  }

  back() {
    this.store.dispatch({ type: BACK_TO_COURSE_DETAIL_PAGE_PATH });
  }

}
