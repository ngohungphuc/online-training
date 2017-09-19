import * as signalR from '@aspnet/signalr-client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'online-training-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.testConnection();
  }

  constructor() {

  }

  testConnection() {
    const connection = new signalR.HubConnection('http://localhost:51316/onlinehub');

    connection.on('testSend', data => {
        console.log(data);
    });

    connection.start()
              .then(() => connection.invoke('send', 'Hello'));

  }

}
