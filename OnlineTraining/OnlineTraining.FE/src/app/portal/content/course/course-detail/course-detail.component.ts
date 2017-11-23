import * as fromCourseDetail from '../store/index';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import {
   BACK_TO_COURSE_DETAIL_PAGE_PATH,
  GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID } from '../store/actions/course.actions';
import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store/';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ota-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
@AutoUnsubscribe()
export class CourseDetailComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoplayer: any;
  courseDetailList: Subscription;
  loading = true;
  blobUrl: string;

  constructor(
    private store: Store<any>) { }

  ngOnInit() {
    this.getCourseMedia();
    this.getBlobUrl(true);
  }

  getBlobUrl(isInit: boolean) {
    this.store.select(fromCourseDetail.selectCourseMediaByCourseDetailId).subscribe(res => {
      if (res !== null) {
        this.blobUrl = res.blobUrl;
      }
      if (!isInit && this.videoplayer.nativeElement) {
        this.videoplayer.nativeElement.load();
      }
    });
  }

  getCourseMedia() {
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      if (res.length > 0) {
        this.courseDetailList = res;
        // init for default video to load
        this.store.dispatch(
          {type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID,
          payload: res[0].courseModule[0].courseMediaId});
      }
      this.loading = false;
    });
  }

  backToPrevious() {
    this.store.dispatch({ type: BACK_TO_COURSE_DETAIL_PAGE_PATH });
  }

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.paused ? this.videoplayer.nativeElement.play() : this.videoplayer.nativeElement.pause();
  }

  viewCourse(courseMediaId) {
    this.store.dispatch(
      {type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID,
      payload: courseMediaId});
    this.getBlobUrl(false);
  }

  ngOnDestroy() {

  }
}
