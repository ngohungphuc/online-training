import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authStore from '../../account/store/index';
import { StorageService } from '../../common/services/storage.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'ota-portal-index',
  templateUrl: './portal-index.component.html',
  styleUrls: ['./portal-index.component.scss']
})
export class PortalIndexComponent implements OnInit {

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit() {
   
  }

}
