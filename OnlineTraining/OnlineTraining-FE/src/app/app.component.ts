import * as signalR from '@aspnet/signalr-client';
import { Component, OnInit } from '@angular/core';
import { Http , RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'online-training-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.getData();
  }

  constructor(private http: Http) {

  }
  testConnection() {
    const connection = new signalR.HubConnection('http://localhost:51316/onlinehub');

    connection.on('send', data => {
        console.log(data);
    });

    connection.start()
              .then(() => connection.invoke('Send', 'Hello'));

  }

  getData(): Promise<any> {
      return this.http.get('http://localhost:51316/api/values').toPromise().then(res => console.log(res.json()));
  }
}
