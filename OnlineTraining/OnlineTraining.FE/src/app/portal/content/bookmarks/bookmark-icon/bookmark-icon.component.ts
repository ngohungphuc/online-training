import { BOOK_MARK_COURSE, UNDO_BOOK_MARK_COURSE } from '../store/actions/bookmark.actions';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
  } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { StorageService } from '../../../../common/services/storage.service';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr';


@Component({
  selector: 'ota-bookmark-icon',
  templateUrl: './bookmark-icon.component.html',
  styleUrls: ['./bookmark-icon.component.scss']
})
export class BookmarkIconComponent implements OnInit {
  @Input() id: string;
  @ViewChild('bookmark') bookMarkIcon;
  active = false;
  userId: string;
  constructor(
    private store: Store<any>,
    private storageService: StorageService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
      const currentUserInfo = this.storageService.getObject(environment.authKey);
      this.userId = currentUserInfo.userId;
     }

  ngOnInit() {
  }

  bookmarkCourse(data) {
    const bookmarkInfo = {
      courseId: this.id,
      userId: this.userId
    };
    this.active = !this.active;
    if (this.active) {
      this.bookMarkIcon.nativeElement.classList.add('active');
      this.store.dispatch({type: BOOK_MARK_COURSE, payload: bookmarkInfo});
      this.toastr.info('Bookmark success');
    } else {
      this.bookMarkIcon.nativeElement.classList.remove('active');
      this.store.dispatch({type: UNDO_BOOK_MARK_COURSE, payload: bookmarkInfo});
      this.toastr.warning('Remove bookmark success');
    }
  }
}
