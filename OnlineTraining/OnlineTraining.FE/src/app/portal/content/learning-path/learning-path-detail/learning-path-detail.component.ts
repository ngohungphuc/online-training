import * as fromLearningPathList from '../../learning-path/store/index';
import { AuthService } from '../../../../common/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { DETAIL_PAGE } from '../store/actions/learning-path.layout.actions';
import { Store } from '@ngrx/store';
import { GET_COURSE_BY_LEARNING_PATH_ID } from '../store/actions/learning-path.actions';
import { Course } from '../store/model/course.model';

@Component({
  selector: 'ota-learning-path-detail',
  templateUrl: './learning-path-detail.component.html',
  styleUrls: ['./learning-path-detail.component.scss']
})
export class LearningPathDetailComponent implements OnInit {
  isDetailPage: boolean;
  pathId: string;
  courseByPathId: Course;
  learningPathDescription: string;
  constructor(private store: Store<any>, private authService: AuthService) {}

  ngOnInit() {
    this.store
      .select(fromLearningPathList.selectLearningPathLayout)
      .subscribe((res: any) => {
        this.isDetailPage = res.isDetailPage;
        this.pathId = res.pathId;
        this.learningPathDescription = res.learningPathDescription;
      });
    this.store.dispatch({
      type: GET_COURSE_BY_LEARNING_PATH_ID,
      payload: this.pathId
    });
    this.store
      .select(fromLearningPathList.selectCourseByPathId)
      .subscribe(res => {
        this.courseByPathId = res;
      });
  }

  togglePathPage() {
    this.store.dispatch({ type: DETAIL_PAGE, payload: false });
  }
}
