import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import * as signalR from '@aspnet/signalr-client';
declare var signalR: any;
import { HubConnection } from '@aspnet/signalr-client';
import { environment } from './../../../environments';

/**
* This class provides the SignalR service with methods to read names and add names.
*/
@Injectable()
export class SignalRService {
    onlineHubUrl = environment.serverUrl;
    constructor() {

    }

    connectOnlineHub(): HubConnection {
        const connection = new signalR.HubConnection(`${this.onlineHubUrl}/onlinehub`);
        return connection;
    }
}
