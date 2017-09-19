import { NgModule } from '@angular/core';
import { SignalRService, DataHandlerService } from './index';

@NgModule({
    providers: [
        SignalRService,
        DataHandlerService
    ]
})
export class SharedModule {  }