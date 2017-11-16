import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import * as fromCourseDetail from '../learning-path/store/index';
import { PATH_DETAIL_PAGE, BACK_TO_COURSE_DETAIL_PAGE_PATH } from '../learning-path/store/actions/learning-path.layout.actions';
@Component({
  selector: 'ota-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseDetailList: any;
  loading = true;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      console.log(res);
      this.courseDetailList = res;
      this.loading = false;
    });
  }

  back() {
    this.store.dispatch({ type: BACK_TO_COURSE_DETAIL_PAGE_PATH });
  }
}
