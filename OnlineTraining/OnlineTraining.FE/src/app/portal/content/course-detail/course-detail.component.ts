import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store/';
import * as fromCourseDetail from '../learning-path/store/index';
@Component({
  selector: 'ota-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  courseDetailList: any;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(fromCourseDetail.selectCourseDetailByCourseId).subscribe(res => {
      console.log(res);
      this.courseDetailList = res;
    });
  }

}
