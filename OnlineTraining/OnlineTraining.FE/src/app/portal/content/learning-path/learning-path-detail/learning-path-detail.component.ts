import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DETAIL_PAGE } from '../store/actions/learning-path.layout.actions';
import * as fromLearningPathList from '../../learning-path/store/index';
@Component({
  selector: 'ota-learning-path-detail',
  templateUrl: './learning-path-detail.component.html',
  styleUrls: ['./learning-path-detail.component.scss']
})
export class LearningPathDetailComponent implements OnInit{
  isDetailPage: boolean;
  constructor(
    private store: Store<any>) {

    }

    ngOnInit() {
      this.store
      .select(fromLearningPathList.selectLearningPathLayout)
      .subscribe(res => {
        this.isDetailPage = res.isDetailPage;
      });
    }

  togglePathPage() {
    this.store.dispatch({type: DETAIL_PAGE, payload: false});
  }
}
