
import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr-client';
@Component({
  selector: 'online-training-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.testConnection();
  }

  constructor() {

  }

  testConnection() {
    const connection = new signalR.HubConnection('http://localhost:51316/onlinehub');

    connection.on('TotalClientConnect', data => {
        console.log(data);
    });

    connection.start()
              .then(() => connection.invoke('GetTotalAccountConnect'));

  }
}
