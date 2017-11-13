import { GET_BOOK_MARK } from './store/actions/bookmark.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StorageService } from '../../../common/services/storage.service';
import * as fromBookmark from './store/index';
import { Course } from '../learning-path/store/model/course.model';
@Component({
  selector: 'ota-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  userId: string;
  courseBookmark: Course;
  constructor(private store: Store<any>,
  private storageService: StorageService) {
    this.userId = this.storageService.getCurrentUserId();
  }

  ngOnInit() {
    this.store.dispatch({type: GET_BOOK_MARK, payload: this.userId});
    this.store.select(fromBookmark.selectCourseByBookmarkId).subscribe(res => {
      this.courseBookmark = res;
    });
  }

}
