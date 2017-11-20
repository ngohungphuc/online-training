import { Component, Input, OnInit } from '@angular/core';
import { GET_COURSE_DETAIL_PAGE } from '../../../portal/content/course/store/actions/course.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ota-course-detail-btn',
  templateUrl: './course-detail-btn.component.html',
  styleUrls: ['./course-detail-btn.component.scss']
})
export class CourseDetailBtnComponent implements OnInit {
  @Input() course;
  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  toggleCourseDetailPage(course) {
    this.store.dispatch({type: GET_COURSE_DETAIL_PAGE, payload: course.id});
  }
}
