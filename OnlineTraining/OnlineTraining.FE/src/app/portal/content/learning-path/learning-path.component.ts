import * as fromLearningPathList from '../learning-path/store/index';
import { Component, OnInit } from '@angular/core';
import { GET_LEARNING_PATH } from './store/actions/learning-path.actions';
import { PATH_DETAIL_PAGE } from './store/actions/learning-path.layout.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ota-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {
  pathList: any;
  isDetailPage: boolean;
  loading = true;
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch({ type: GET_LEARNING_PATH });
    this.store
      .select(fromLearningPathList.selectLearningPathList)
      .subscribe(res => {
        this.pathList = res;
      });
    this.loading = false;
  }

  toggleDetailPage(path) {
    const pathInfo = {
      pathId: path.id,
      learningPathDescription: path.learningPathDescription,
      isDetailPage: true
    };
    this.store.dispatch({ type: PATH_DETAIL_PAGE, payload: pathInfo });
    this.store
      .select(fromLearningPathList.selectLearningPathDetailPage)
      .subscribe((res: any) => {
        this.isDetailPage = res;
      });
  }
}
