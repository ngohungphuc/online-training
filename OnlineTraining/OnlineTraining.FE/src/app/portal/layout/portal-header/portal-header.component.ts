import { StorageService } from '../../../common/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { LOGOUT } from '../../../account/store/actions/auth.actions';

@Component({
  selector: 'ota-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {
  userName: string;
  constructor(
    private storageService: StorageService,
    private store: Store<any>) { }

  ngOnInit() {
    const userInfo = this.storageService.getObject(environment.authKey);
    this.userName = userInfo.account;
  }

  logout() {
    this.store.dispatch({type: LOGOUT});
  }
}
