import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DETAIL_PAGE } from '../store/actions/learning-path.layout.actions';
import * as fromLearningPathList from '../../learning-path/store/index';
import { AuthService } from '../../../../common/services/auth.service';

@Component({
  selector: 'ota-learning-path-detail',
  templateUrl: './learning-path-detail.component.html',
  styleUrls: ['./learning-path-detail.component.scss']
})
export class LearningPathDetailComponent implements OnInit{
  isDetailPage: boolean;
  constructor(
    private store: Store<any>,
    private authService: AuthService) {

    }

    ngOnInit() {
      this.store
      .select(fromLearningPathList.selectLearningPathLayout)
      .subscribe(res => {
        this.isDetailPage = res.isDetailPage;
        const objectId = this.convertToObjectId(res.pathInfo.id.creationTime);
        
        this.authService.Get(`api/Course/GetCourseByPathId?pathId=${objectId}`).subscribe(data => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
        });
      });
    }

  togglePathPage() {
    this.store.dispatch({type: DETAIL_PAGE, payload: false});
  }

  convertToObjectId(dateTime){
    console.log('====================================');
    console.log(dateTime);
    console.log('====================================');
    const date = new Date(dateTime);
    console.log('====================================');
    console.log(Math.floor(date.getTime() / 1000).toString(16));
    console.log('====================================');
    return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
  }
}
