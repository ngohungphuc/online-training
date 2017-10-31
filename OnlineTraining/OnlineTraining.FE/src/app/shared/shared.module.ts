import { NgModule } from '@angular/core';
import { SignalRService, DataHandlerService } from './index';
import {
    FooterComponent,
    NotFoundComponent } from '../shared/index';


@NgModule({
  providers: [
      SignalRService,
      DataHandlerService
  ],
  exports: [
      FooterComponent
  ],
  declarations: [
    FooterComponent,
    NotFoundComponent]
})

export class SharedModule {}
