import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { GET_COURSE_DETAIL_PAGE } from '../../../portal/content/learning-path/store/actions/learning-path.layout.actions';

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
