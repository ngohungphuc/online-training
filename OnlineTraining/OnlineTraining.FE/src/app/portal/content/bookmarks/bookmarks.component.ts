import * as fromBookmark from './store/index';
import { Component, OnInit } from '@angular/core';
import { Course } from '../learning-path/store/model/course.model';
import { GET_BOOK_MARK, GET_BOOK_MARK_BY_USERID } from './store/actions/bookmark.actions';
import { StorageService } from '../../../common/services/storage.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'ota-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {
  userId: string;
  loading = true;
  bookmark: any;
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
    this.getBookmarkStatus();
  }

  getBookmarkStatus(){
    this.store.dispatch({type: GET_BOOK_MARK_BY_USERID, payload: this.userId});
    this.store.select(fromBookmark.selectBookmarkByUserId).subscribe(res => {
      if (res) {
        this.bookmark = res;
        this.loading = false;
      }
    });
  }
}
