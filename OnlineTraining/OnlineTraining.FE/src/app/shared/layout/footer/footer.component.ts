import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../../index';

@Component({
  selector: 'ota-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  totalOnline: number;
  constructor(private signalRService: SignalRService) {}

  ngOnInit() {
    this.getTotalConnection();
  }

  getTotalConnection() {
    const connection = this.signalRService.connectOnlineHub();
    connection.start().then(() => connection.invoke('GetTotalAccountConnect'));
    connection.on('TotalClientConnect', data => {
      this.totalOnline = data;
    });
  }
}
