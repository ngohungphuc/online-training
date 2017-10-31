import {SignalRService} from '../app/shared/index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'online-training-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {

  }

  constructor(private signalRService: SignalRService) {

  }
}
