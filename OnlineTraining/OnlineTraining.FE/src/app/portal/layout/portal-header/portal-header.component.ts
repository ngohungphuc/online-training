import { StorageService } from '../../../common/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'ota-portal-header',
  templateUrl: './portal-header.component.html',
  styleUrls: ['./portal-header.component.scss']
})
export class PortalHeaderComponent implements OnInit {
  userName: string;
  constructor(
    private storageService: StorageService) { }

  ngOnInit() {
    const userInfo = this.storageService.getObject(environment.authKey);
    this.userName = userInfo.account;
  }

}
