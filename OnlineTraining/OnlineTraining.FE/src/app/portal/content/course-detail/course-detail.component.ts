import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import * as fromCourseDetail from '../learning-path/store/index';
import { PATH_DETAIL_PAGE, BACK_TO_COURSE_DETAIL_PAGE_PATH } from '../learning-path/store/actions/learning-path.layout.actions';
import { GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID } from '../learning-path/store/actions/learning-path.actions';
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
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      this.courseDetailList = res;
      this.loading = false;
      // init for default video to load
      this.store.dispatch({type: GET_COURSE_MEDIA_BY_COURSE_DETAIL_ID, payload: res[0].courseModule[0].courseMediaId
      });
    });
    this.store.select(fromCourseDetail.selectCourseMediaByCourseDetailId).subscribe(res => {
      if (res !== null) {
        this.blobUrl = res.blobUrl;
      }
      //
    });
  }

  back() {
    this.store.dispatch({ type: BACK_TO_COURSE_DETAIL_PAGE_PATH });
  }
}
