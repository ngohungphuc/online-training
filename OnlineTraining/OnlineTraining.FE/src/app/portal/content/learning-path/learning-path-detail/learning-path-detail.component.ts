import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DETAIL_PAGE } from '../store/actions/learning-path.layout.actions';

@Component({
  selector: 'ota-learning-path-detail',
  templateUrl: './learning-path-detail.component.html',
  styleUrls: ['./learning-path-detail.component.scss']
})
export class LearningPathDetailComponent implements OnInit {

  constructor(
    private store: Store<any>) { }

  ngOnInit() {
  }

  togglePathPage() {
    this.store.dispatch({type: DETAIL_PAGE, payload: false});
  }
}
