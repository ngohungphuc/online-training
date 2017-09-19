import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as signalR from '@aspnet/signalr-client';
/**
* This class provides the SignalR service with methods to read names and add names.
*/
@Injectable()
export class SignalRService {

    constructor() {

    }

    connectOnlineHub() {
        const connection = new signalR.HubConnection('http://localhost:51316/onlinehub');
    }
}