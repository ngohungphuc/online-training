import * as fromLearningPathList from '../../learning-path/store/index';
import { AuthService } from '../../../../common/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { DETAIL_PAGE } from '../store/actions/learning-path.layout.actions';
import { Store } from '@ngrx/store';
import { GET_COURSE_BY_LEARNING_PATH_ID } from '../store/actions/learning-path.actions';
import { Course } from '../store/model/course.model';
import { StorageService } from '../../../../common/services/storage.service';
import { environment } from '../../../../../environments/environment';
import { GET_BOOK_MARK_BY_USERID } from '../../bookmarks/store/actions/bookmark.actions';
import * as fromBookmark from '../../bookmarks/store/index';

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
  userId: string;
  bookmark: any;
  constructor(
    private store: Store<any>,
    private storageService: StorageService) {
    const currentUserInfo = this.storageService.getObject(environment.authKey);
    this.userId = currentUserInfo.userId;
  }

  ngOnInit() {
    this.getBookmarkStatus();
  }

  togglePathPage() {
    this.store.dispatch({ type: DETAIL_PAGE, payload: false });
  }

  getDataFromLearningPath() {
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
  }

  getCourseByPathId(){
    this.store
    .select(fromLearningPathList.selectCourseByPathId)
    .subscribe(res => {
      this.courseByPathId = res;
    });
  }

  getBookmarkStatus(){
    this.store.dispatch({type: GET_BOOK_MARK_BY_USERID, payload: this.userId});
    this.store.select(fromBookmark.selectBookmarkByUserId).subscribe(res => {
      if (res !== null) {
        this.bookmark = res;
        this.getDataFromLearningPath();
        this.getCourseByPathId();
      }
    });
  }
}
