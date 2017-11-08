import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GET_LEARNING_PATH } from './store/actions/learning-path.actions';
import * as fromLearningPathList from '../learning-path/store/index';

@Component({
  selector: 'ota-learning-path',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent implements OnInit {
  pathList: any;
  constructor(private store: Store<any> ) { }

  ngOnInit() {
    this.store.dispatch({type: GET_LEARNING_PATH});
    this.store.select(fromLearningPathList.selectLearningPathList).subscribe(res => {
       this.pathList = res.pathList;
    });
  }

}
